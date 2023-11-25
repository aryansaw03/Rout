import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import getThemeColors from "../../constants/Colors";
import { useAuth } from "../../context/auth";

export default function TabLayout() {
	const colors = getThemeColors(useColorScheme());
	const user = useAuth();

	if (!user) {
		return <Redirect href="/sign-in" />;
	}

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: colors.primary,
				tabBarInactiveTintColor: colors.accent,
				headerShown: false,
				tabBarLabelStyle: {
					fontFamily: "JosefinSans-Regular",
				},
				tabBarStyle: {
					backgroundColor: colors.backgroundTint,
					borderTopWidth: 0,
					height: 90,
				},
			}}>
			<Tabs.Screen
				name="my-rentals"
				options={{
					tabBarLabel: "My Rentals",
					tabBarIcon: ({ size, color }) => (
						<Entypo name="shopping-bag" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="dashboard"
				options={{
					tabBarLabel: "Search",
					tabBarIcon: ({ size, color }) => (
						<Ionicons name="search" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					tabBarLabel: "Profile",
					tabBarIcon: ({ size, color }) => (
						<FontAwesome name="user" size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
