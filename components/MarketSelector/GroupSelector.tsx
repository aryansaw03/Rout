import MarketSelector from "@components/Common/MarketSelector";
import getThemeColors from "@constants/Colors";
import { useGroups } from "@context/groups";
import { useMarket } from "context/market";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

const GroupSelector = () => {
	const colors = getThemeColors();
	const { ownedGroups, joinedGroups, loaded } = useGroups();
	const allGroups = [...ownedGroups, ...joinedGroups];
	return (
		<View
			className="flex-1 w-full items-center"
			style={{ backgroundColor: colors.background }}>
			<Text
				className="text-2xl mb-2"
				style={{
					color: colors.primaryText,
					fontFamily: "JosefinSans-Regular",
				}}>
				Your Groups
			</Text>
			{!loaded ? (
				<View className="flex-1 items-center">
					<ActivityIndicator />
				</View>
			) : (
				<FlatList
					style={{ width: "100%" }}
					data={allGroups}
					renderItem={({ item }) => (
						<MarketSelector item={item}>
							<Text
								className="text-xl"
								style={{
									fontFamily: "JosefinSans-Regular",
									color: colors.primaryText,
								}}>
								{item.name}
							</Text>
						</MarketSelector>
					)}
					keyExtractor={(item) => item.groupID}
					contentContainerStyle={{
						gap: 15,
						paddingVertical: 15,
						alignItems: "center",
					}}
				/>
			)}
		</View>
	);
};

export default GroupSelector;
