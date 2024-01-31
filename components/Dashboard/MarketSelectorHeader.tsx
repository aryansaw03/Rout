import getThemeColors from "@constants/Colors";
import { useMarket } from "context/market";
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const MarketSelectorHeader = () => {
	const colors = getThemeColors();
	const { market } = useMarket();
	return (
		<>
			<Text
				style={{
					color: colors.primary,
					fontFamily: "JosefinSans-Regular",
				}}>
				Searching in...
			</Text>
			<Link href="/market-selector" asChild>
				<TouchableOpacity className="flex-row items-center mt-2">
					<Text
						className="text-2xl mr-3"
						style={{
							color: colors.primaryText,
							fontFamily: "JosefinSans-Medium",
						}}>
						{market?.type === "group"
							? market?.name
							: market?.city + ", " + market?.state}
					</Text>
					<FontAwesome
						name="chevron-down"
						size={18}
						color={colors.primaryText}
					/>
				</TouchableOpacity>
			</Link>
		</>
	);
};

export default MarketSelectorHeader;
