import getThemeColors from "@constants/Colors";
import { useGroupOperations, useGroups } from "@context/groups";
import { GroupMarket } from "@utils/Types";
import { Link, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
	Keyboard,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";

const editGroup = () => {
	const { groupID } = useLocalSearchParams<{ groupID: string }>();
	const { ownedGroups } = useGroups();
	const group = ownedGroups.find((group) => group.groupID === groupID)!;
	const colors = getThemeColors();
	const { updateGroup, deleteGroup } = useGroupOperations();
	const [groupName, setGroupName] = useState("");
	const [inviteCode, setInviteCode] = useState("");
	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}>
			<View
				className="flex-1 w-full items-center justify-center"
				style={{ backgroundColor: colors.background }}>
				<Text
					className="text-lg"
					style={{
						fontFamily: "JosefinSans-Light",
						color: colors.primaryText,
					}}>
					New Group Name:
				</Text>
				<TextInput
					className="w-2/3 h-14 text-lg text-center rounded-xl mb-3"
					placeholder={group.name}
					value={groupName}
					onChangeText={setGroupName}
					style={{
						backgroundColor: colors.backgroundTint,
						fontFamily: "JosefinSans-Regular",
						color: colors.accent,
					}}
				/>
				<Text
					className="text-lg"
					style={{
						fontFamily: "JosefinSans-Light",
						color: colors.primaryText,
					}}>
					New Invite Code:
				</Text>
				<TextInput
					className="w-2/3 h-14 text-lg text-center rounded-xl mb-3"
					placeholder={group.inviteCode}
					value={inviteCode}
					onChangeText={setInviteCode}
					style={{
						backgroundColor: colors.backgroundTint,
						fontFamily: "JosefinSans-Regular",
						color: colors.accent,
					}}
				/>
				<Link href="/groups" asChild>
					<TouchableOpacity
						className="h-14 w-40 rounded-xl my-3 items-center justify-center"
						style={{ backgroundColor: colors.primary }}
						onPress={() => {
							const newGroup = {
								...group,
								name: groupName === "" ? group.name : groupName,
								inviteCode:
									inviteCode === ""
										? group.inviteCode
										: inviteCode,
							};
							updateGroup(newGroup);
						}}>
						<Text
							className="text-lg"
							style={{
								fontFamily: "JosefinSans-Medium",
								color: colors.secondaryText,
							}}>
							Confirm
						</Text>
					</TouchableOpacity>
				</Link>
				<Link href="/groups" asChild>
					<TouchableOpacity
						className="h-14 w-40 rounded-xl my-3 items-center justify-center"
						style={{ backgroundColor: "#ff8080" }}
						onPress={() => {
							deleteGroup(groupID);
						}}>
						<Text
							className="text-lg"
							style={{
								fontFamily: "JosefinSans-Medium",
								color: colors.secondaryText,
							}}>
							Delete
						</Text>
					</TouchableOpacity>
				</Link>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default editGroup;
