import { db } from "@FirebaseConfig";
import { useAuth } from "@context/auth";
import { GroupMarket } from "@utils/Types";
import {
	DocumentReference,
	addDoc,
	arrayRemove,
	arrayUnion,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where,
	writeBatch,
} from "firebase/firestore";
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

type GroupsContextType = {
	joinedGroups: GroupMarket[];
	setJoinedGroups: React.Dispatch<React.SetStateAction<GroupMarket[]>>;
	ownedGroups: GroupMarket[];
	setOwnedGroups: React.Dispatch<React.SetStateAction<GroupMarket[]>>;
	refresh: () => Promise<void>;
	loaded: boolean;
};

export const GroupsContext = createContext<GroupsContextType | undefined>(
	undefined
);

type GroupsProviderProps = {
	children: ReactNode;
};

export const GroupsProvider = ({ children }: GroupsProviderProps) => {
	const [joinedGroups, setJoinedGroups] = useState<GroupMarket[]>([]);
	const [ownedGroups, setOwnedGroups] = useState<GroupMarket[]>([]);
	const [loaded, setLoaded] = useState<boolean>(false);
	const { user } = useAuth();

	const fetchGroups = async () => {
		try {
			setLoaded(false);
			if (!user) {
				setJoinedGroups([]);
				setOwnedGroups([]);
				setLoaded(true);
				return;
			}
			const userRef = doc(db, "Users", user.uid);
			const userSnap = await getDoc(userRef);
			const ownedGroupsRefs = (userSnap.data()?.ownedGroups ??
				[]) as DocumentReference[];
			const joinedGroupsRefs = (userSnap.data()?.joinedGroups ??
				[]) as DocumentReference[];
			const [ownedGroupsData, joinedGroupsData] = await Promise.all([
				Promise.all(
					ownedGroupsRefs.map(async (groupRef) => {
						const docSnap = await getDoc(groupRef);
						return {
							type: "group",
							name: docSnap.data()?.name ?? "",
							groupID: groupRef.id,
							inviteCode: docSnap.data()?.inviteCode ?? "",
						} as GroupMarket;
					})
				),
				Promise.all(
					joinedGroupsRefs.map(async (groupRef) => {
						const docSnap = await getDoc(groupRef);
						return {
							type: "group",
							name: docSnap.data()?.name ?? "",
							groupID: groupRef.id,
						} as GroupMarket;
					})
				),
			]);
			setOwnedGroups(ownedGroupsData);
			setJoinedGroups(joinedGroupsData);
		} catch (error) {
			console.error("Error fetching groups:", error);
		} finally {
			setLoaded(true);
		}
	};

	useEffect(() => {
		fetchGroups();
	}, [user]);

	return (
		<GroupsContext.Provider
			value={{
				joinedGroups,
				setJoinedGroups,
				ownedGroups,
				setOwnedGroups,
				refresh: fetchGroups,
				loaded,
			}}>
			{children}
		</GroupsContext.Provider>
	);
};

export const useGroups = () => {
	const context = useContext(GroupsContext);
	if (!context) {
		throw new Error("useGroups must be used within a GroupsProvider");
	}
	return context;
};

export const useGroupOperations = () => {
	const context = useContext(GroupsContext);
	if (!context) {
		throw new Error(
			"useGroupOperations must be used within a GroupsProvider"
		);
	}

	const { user } = useAuth();
	const { joinedGroups, setJoinedGroups, ownedGroups, setOwnedGroups } =
		context;

	const createGroup = async (name: string, inviteCode: string) => {
		if (!user) return;
		const userRef = doc(db, "Users", user.uid);
		const newGroup = { name: name, owner: userRef, inviteCode: inviteCode };
		const groupRef = await addDoc(collection(db, "Groups"), newGroup);
		await updateDoc(userRef, {
			ownedGroups: arrayUnion(groupRef),
		});
		const group = {
			type: "group",
			name: name,
			groupID: groupRef.id,
			inviteCode: inviteCode,
		} as GroupMarket;
		setOwnedGroups([...ownedGroups, group]);
	};

	const updateGroup = async (
		updatedData: Partial<GroupMarket> & { groupID: string }
	) => {
		if (!user) return;
		const { type, groupID, ...dataWithoutTypeField } = updatedData;
		const groupRef = doc(db, "Groups", updatedData.groupID);
		await updateDoc(groupRef, dataWithoutTypeField);
		setOwnedGroups((prevGroups) => {
			return prevGroups.map((group) => {
				if (group.groupID === updatedData.groupID) {
					return { ...group, ...updatedData };
				}
				return group;
			});
		});
	};

	const deleteGroup = async (groupId: string) => {
		const groupRef = doc(db, "Groups", groupId);
		const usersRef = collection(db, "Users");
		const batch = writeBatch(db);
		const joinedUsersSnapshot = await getDocs(
			query(usersRef, where("joinedGroups", "array-contains", groupRef))
		);
		joinedUsersSnapshot.forEach((docSnap) => {
			batch.update(docSnap.ref, {
				joinedGroups: arrayRemove(groupRef),
			});
		});
		const groupDoc = await getDoc(groupRef);
		if (groupDoc.exists()) {
			const ownerRef = groupDoc.data().owner;
			if (ownerRef) {
				batch.update(ownerRef, {
					ownedGroups: arrayRemove(groupRef),
				});
			}
		}
		batch.delete(groupRef);
		await batch.commit();
		setOwnedGroups(
			ownedGroups.filter((group) => group.groupID !== groupId)
		);
	};

	const joinGroup = async (inviteCode: string) => {
		if (!user) return;
		const groupsRef = collection(db, "Groups");
		const querySnapshot = await getDocs(
			query(groupsRef, where("inviteCode", "==", inviteCode))
		);
		if (!querySnapshot.empty) {
			const groupDoc = querySnapshot.docs[0];
			const groupRef = groupDoc.ref;
			const userRef = doc(db, "Users", user.uid);
			await updateDoc(userRef, {
				joinedGroups: arrayUnion(groupRef),
			});
			const group = {
				type: "group",
				name: groupDoc.data().name,
				groupID: groupRef.id,
			} as GroupMarket;

			setJoinedGroups((currentJoinedGroups) => [
				...currentJoinedGroups,
				group,
			]);
		} else {
			console.log("No group found with the provided invite code");
		}
	};


	const leaveGroup = async (groupId: string) => {
		if (!user) return;
		const userRef = doc(db, "Users", user.uid);
		const groupRef = doc(db, "Groups", groupId);
		await updateDoc(userRef, {
			joinedGroups: arrayRemove(groupRef),
		});
		setJoinedGroups(
			joinedGroups.filter((group) => group.groupID !== groupId)
		);
	};

	return { createGroup, updateGroup, deleteGroup, joinGroup, leaveGroup };
};
