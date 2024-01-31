import MarketSelectorHeader from "@components/Dashboard/MarketSelectorHeader";
import getThemeColors from "@constants/Colors";
import { GroupsProvider } from "@context/groups";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function TabLayout() {
	const colors = getThemeColors();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: colors.primary,
				tabBarInactiveTintColor: colors.accent,
				tabBarLabelStyle: {
					fontFamily: "JosefinSans-Regular",
				},
				tabBarStyle: {
					backgroundColor: colors.backgroundTint,
					borderTopWidth: 0,
					height: 90,
				},
				headerStyle: {
					backgroundColor: colors.backgroundTint,
					height: 144,
					shadowColor: "#000",
					shadowOffset: {
						width: 0,
						height: 2,
					},
					shadowOpacity: 0.4,
					shadowRadius: 4,
					elevation: 10,
				},
				headerTitleContainerStyle: {
					alignItems: "center",
					justifyContent: "flex-end",
					paddingBottom: 12,
				},
				headerTitle: ({ children }) => (
					<Text
						className="text-2xl mr-3"
						style={{
							color: colors.primaryText,
							fontFamily: "JosefinSans-Medium",
						}}>
						{children}
					</Text>
				),
			}}>
			<Tabs.Screen
				name="my-rentals"
				options={{
					title: "My Rentals",
					tabBarLabel: "My Rentals",
					tabBarIcon: ({ size, color }) => (
						<Entypo name="shopping-bag" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="(dashboard)"
				options={{
					title: "Dashboard",
					tabBarLabel: "Search",
					tabBarIcon: ({ size, color }) => (
						<Ionicons name="search" size={size} color={color} />
					),
					headerTitle: () => <MarketSelectorHeader />,
				}}
			/>
			<Tabs.Screen
				name="(groups)"
				options={{
					title: "Groups",
					tabBarLabel: "Groups",
					tabBarIcon: ({ size, color }) => (
						<Ionicons name="list" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarLabel: "Profile",
					tabBarIcon: ({ size, color }) => (
						<FontAwesome name="user" size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
