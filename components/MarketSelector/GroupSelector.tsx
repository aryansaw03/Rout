import getThemeColors from "@constants/Colors";
import { useMarket } from "@context/market";
import { GroupMarket, LocationMarket } from "@utils/Types";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const GroupSelector = () => {
	const colors = getThemeColors();
	const { setMarket } = useMarket();
	const router = useRouter();
	const availableGroups: GroupMarket[] = [
		{
			type: "group",
			name: "Official UVA Resale Marketplace",
			groupID: 123,
		},
		{
			type: "group",
			name: "UVA Fraternities and Sororities",
			groupID: 124,
		},
	];
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
			{availableGroups.map((group, index) => {
				return (
					<TouchableOpacity
						key={index}
						className="w-3/4 py-4 items-center border rounded-2xl my-2"
						style={{ borderColor: colors.accent }}
						onPress={() => {
							setMarket(group);
							router.back();
						}}>
						<Text
							className="text-lg"
							style={{
								color: colors.primaryText,
								fontFamily: "JosefinSans-Regular",
							}}>
							{group.name}
						</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

export default GroupSelector;
