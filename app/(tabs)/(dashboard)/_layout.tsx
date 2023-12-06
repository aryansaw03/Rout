import { Redirect, Stack, router } from "expo-router";
import { useAuth } from "@context/auth";
import { TouchableOpacity, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import getThemeColors from "@constants/Colors";

export default function TabLayout() {
	const user = useAuth();
	const colors = getThemeColors(useColorScheme());

	if (!user) {
		return <Redirect href="/sign-in" />;
	}

	return (
		<Stack>
			<Stack.Screen
				name="market-selector"
				options={{
					presentation: "modal",
					title: "Select your Market",
					headerLeft: () => (
						<TouchableOpacity onPress={() => router.back()}>
							<Ionicons
								name="chevron-back"
								size={28}
								color={colors.primaryText}
							/>
						</TouchableOpacity>
					),
					headerStyle: {
						backgroundColor: colors.backgroundTint,
					},
					headerTitleStyle: {
						color: colors.primaryText,
						fontFamily: "JosefinSans-Medium",
						fontSize: 24,
					},
				}}
			/>
			<Stack.Screen name="dashboard" options={{ headerShown: false }} />
		</Stack>
	);
}
