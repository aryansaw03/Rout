import getThemeColors from "@constants/Colors";
import { useMarket } from "@context/market";
import { Market } from "@utils/Types";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
const MarketItem = ({
	item,
	children,
}: {
	item: Market;
	children?: React.ReactNode;
}) => {
	const colors = getThemeColors();
	const { setMarket } = useMarket();
	return (
		<Link href="/dashboard" asChild>
			<TouchableOpacity
				className="w-96 py-5 px-5 rounded-2xl border items-center"
				style={{
					backgroundColor: colors.backgroundTint,
					borderColor: colors.secondaryText,
				}}
				onPress={() => {
					setMarket(item);
				}}>
				{children}
			</TouchableOpacity>
		</Link>
	);
};

export default MarketItem;
