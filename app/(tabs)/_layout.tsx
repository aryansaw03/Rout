import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Redirect, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";

import Colors from "../../constants/Colors";
import { useAuth } from "../../context/auth";

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const user = useAuth();

	if (!user) {
		return <Redirect href="/sign-in" />;
	}

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: 'blue',
			}}>
			<Tabs.Screen
				name="one"
				options={{
					title: "Tab One",
				}}
			/>
			<Tabs.Screen
				name="two"
				options={{
					title: "Tab Two",
				}}
			/>
		</Tabs>
	);
}
