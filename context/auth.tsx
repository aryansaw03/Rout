import { router, useRootNavigationState, useSegments } from "expo-router";
import { User, onAuthStateChanged } from "@firebase/auth";
import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@FirebaseConfig";

// create context
const AuthContext = createContext<{ user: User | null ; loaded: boolean } | undefined>(undefined);

// This hook can be used to access the user info.
export function useAuth() {
	const context = useContext(AuthContext);

	if (context === undefined) {
		throw new Error("useAuth must be used within a Provider");
	}

	return context;
}

export function AuthProvider({ children }: React.PropsWithChildren) {
	const [user, setUser] = useState<User | null>(null);
	const [loaded, setLoaded] = useState<boolean>(false);

	useEffect(() => {
		const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
			if (user) {
				setUser(user);
				router.replace("/dashboard");
			} else {
				setUser(null);
				router.replace("/sign-in");
			}
			setLoaded(true);
		});
		return () => unsubscribeAuth();
	}, []);

	return (
		<AuthContext.Provider value={{ user, loaded }}>
			{children}
		</AuthContext.Provider>
	);
}
