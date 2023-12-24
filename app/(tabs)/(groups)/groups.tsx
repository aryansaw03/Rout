import MarketSelector from "@components/Common/MarketSelector";
import getThemeColors from "@constants/Colors";
import { useGroupOperations, useGroups } from "@context/groups";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React from "react";
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

const Groups = () => {
	const colors = getThemeColors();
	const router = useRouter();
	const { ownedGroups, joinedGroups, loaded, refresh } = useGroups();
	const { leaveGroup } = useGroupOperations();
	const allGroups = [
		...ownedGroups.map((group) => ({ group: group, owned: true })),
		...joinedGroups.map((group) => ({ group: group, owned: false })),
	];
	return (
		<View
			className="flex-1 w-full items-center"
			style={{ backgroundColor: colors.background }}>
			{!loaded ? (
				<View className="flex-1 items-center justify-center">
					<ActivityIndicator />
				</View>
			) : (
				<FlatList
					style={{ width: "100%" }}
					refreshing={!loaded}
					onRefresh={() => refresh()}
					data={allGroups}
					renderItem={({ item }) => (
						<MarketSelector item={item.group}>
							<Text
								className="text-xl"
								style={{
									fontFamily: "JosefinSans-Regular",
									color: colors.primaryText,
								}}>
								{item.group.name}
							</Text>
							<View className="absolute top-0 bottom-0 right-0 px-3 justify-center items-center">
								{item.owned ? (
									<TouchableOpacity
										className="p-2 rounded-xl"
										style={{
											backgroundColor: "#2080ff",
										}}
										onPress={() =>
											router.push(
												`/(tabs)/(groups)/${item.group.groupID}`
											)
										}>
										<FontAwesome
											name="edit"
											size={26}
											color="white"
										/>
									</TouchableOpacity>
								) : (
									<TouchableOpacity
										className="p-2 rounded-xl"
										style={{
											backgroundColor: "#ff8080",
										}}
										onPress={() =>
											leaveGroup(item.group.groupID)
										}>
										<Ionicons
											name="exit-outline"
											size={26}
											color="white"
										/>
									</TouchableOpacity>
								)}
							</View>
						</MarketSelector>
					)}
					keyExtractor={(item) => item.group.groupID}
					contentContainerStyle={{
						gap: 15,
						paddingVertical: 15,
						alignItems: "center",
					}}
				/>
			)}
			<View className="w-full py-4 flex-row items-center justify-center">
				<Link href="/create-group" asChild>
					<TouchableOpacity
						className="h-14 w-40 rounded-xl mx-2 items-center justify-center"
						style={{ backgroundColor: colors.primary }}>
						<Text
							className="text-lg"
							style={{
								fontFamily: "JosefinSans-Medium",
								color: colors.secondaryText,
							}}>
							Create Group
						</Text>
					</TouchableOpacity>
				</Link>
				<Link href="/join-group" asChild>
					<TouchableOpacity
						className="h-14 w-40 rounded-xl mx-2 items-center justify-center"
						style={{ backgroundColor: colors.backgroundTint }}>
						<Text
							className="text-lg"
							style={{
								fontFamily: "JosefinSans-Medium",
								color: colors.primaryText,
							}}>
							Join Group
						</Text>
					</TouchableOpacity>
				</Link>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	item: {
		backgroundColor: "#f9c2ff",
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	title: {
		fontSize: 32,
	},
});

export default Groups;
