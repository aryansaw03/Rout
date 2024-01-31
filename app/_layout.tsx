import { GroupsProvider, useGroups } from "@context/groups";
import { AuthProvider, useAuth } from "@context/auth";
import { MarketProvider, useMarket } from "@context/market";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, useRouter } from "expo-router";
import { useEffect } from "react";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "/sign-in",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	return (
		<AuthProvider>
			<MarketProvider>
				<GroupsProvider>
					<Slot />
					<RootLayoutInner />
				</GroupsProvider>
			</MarketProvider>
		</AuthProvider>
	);
}

function RootLayoutInner() {
	const [fontsLoaded, error] = useFonts({
		"JosefinSans-Regular": require("@assets/fonts/JosefinSans-Regular.ttf"),
		"JosefinSans-Light": require("@assets/fonts/JosefinSans-Light.ttf"),
		"JosefinSans-Medium": require("@assets/fonts/JosefinSans-Medium.ttf"),
		"JosefinSans-Bold": require("@assets/fonts/JosefinSans-Bold.ttf"),
	});
	const { loaded: authLoaded } = useAuth();

	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (fontsLoaded && authLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded, authLoaded]);

	if (!fontsLoaded || !authLoaded) {
		return null;
	}
	return null;
}
