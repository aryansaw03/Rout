import getThemeColors from "@constants/Colors";
import { MarketProvider } from "context/market";
import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function StackLayout() {
	const colors = getThemeColors();

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
