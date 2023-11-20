import { router, useRootNavigationState, useSegments } from "expo-router";
import { User, onAuthStateChanged } from "firebase/auth";
import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../FirebaseConfig";

// create context
const AuthContext = createContext<User | undefined | null>(undefined);

// This hook can be used to access the user info.
export function useAuth(): User | null {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error("useAuth must be used within a Provider");
	}

	return context;
}


export function AuthProvider({ children }: React.PropsWithChildren) {
	const [user, setUser] = useState<User | null>(null);
	const segments = useSegments();
	const navigationState = useRootNavigationState();

	useEffect(() => {
		const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
			if (user) {
				setUser(user);
				router.replace("/(tabs)/one");
			} else {
				setUser(null);
				router.replace("/(auth)/sign-in");
			}
		});
		return () => unsubscribeAuth();
	}, []);

	return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
