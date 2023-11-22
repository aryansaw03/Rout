import { Stack } from "expo-router";

export default function TabLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="sign-in" />
			<Stack.Screen name="register" />
		</Stack>
	);
}
