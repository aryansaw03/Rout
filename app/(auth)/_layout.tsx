import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Stack } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Stack
			screenOptions={{
				headerTintColor: Colors[colorScheme ?? "light"].tint,
			}}>
			<Stack.Screen
				name="sign-in"
				options={{
					title: "Sign In",
				}}
			/>
			<Stack.Screen
				name="register"
				options={{
					title: "Register",
				}}
			/>
		</Stack>
	);
}
