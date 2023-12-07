import getThemeColors from "@constants/Colors";
import React from "react";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const MarketTypeSelector = ({
	selectedMarketType,
	setSelectedMarketType,
	marketTypes,
}: {
	selectedMarketType: string;
	setSelectedMarketType: (item: string) => void;
	marketTypes: string[];
}) => {
	const colors = getThemeColors();
	const styles = stylesGenerator();

	return (
		<View
			className="w-full py-5 items-center justify-center"
			style={{ backgroundColor: colors.background }}>
			<View className="flex-row">
				{marketTypes.map((item, index) => {
					return (
						<TouchableOpacity
							key={index}
							className={`w-48 h-10 items-center justify-center border ${
								index === 0
									? "rounded-l-lg"
									: index === marketTypes.length - 1
									  ? "rounded-r-lg"
									  : ""
							}`}
							style={[
								styles.selectorItem,
								{
									backgroundColor:
										selectedMarketType === item
											? colors.primary
											: colors.backgroundTint,
								},
							]}
							onPress={() => {
								setSelectedMarketType(item);
							}}>
							<Text
								className="text-xl"
								style={{
									fontFamily: "JosefinSans-Light",
									color:
										selectedMarketType === item
											? colors.secondaryText
											: colors.primaryText,
								}}>
								{item.charAt(0).toUpperCase() + item.slice(1)}
							</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		</View>
	);
};

const stylesGenerator = () => {
	const colors = getThemeColors();
	return StyleSheet.create({
		selectorItem: {
			backgroundColor: colors.backgroundTint,
			borderColor: colors.accent,
		},
	});
};

export default MarketTypeSelector;
