import getThemeColors from "@constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function StackLayout() {
	const router = useRouter();
	const colors = getThemeColors();
	return (
		<Stack>
			<Stack.Screen name="groups" options={{ headerShown: false }} />
			<Stack.Screen
				name="[groupID]"
				options={{
					presentation: "modal",
					title: "Edit your Group",
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
			<Stack.Screen
				name="create-group"
				options={{
					presentation: "modal",
					title: "Create your Group",
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
			<Stack.Screen
				name="join-group"
				options={{
					presentation: "modal",
					title: "Join a Group",
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
		</Stack>
	);
}
