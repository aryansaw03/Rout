import getThemeColors from "@constants/Colors";
import React from "react";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const MarketTypeSelector = ({
	selectedMarket,
	setSelectedMarket,
	menuItems,
}: {
	selectedMarket: string;
	setSelectedMarket: (item: string) => void;
	menuItems: string[];
}) => {
	const colors = getThemeColors(useColorScheme());
	const styles = stylesGenerator();

	return (
		<View
			className="w-full h-16 items-center justify-center"
			style={{ backgroundColor: colors.background }}>
			<View className="flex-row">
				{menuItems.map((item, index) => {
					return (
						<TouchableOpacity
							key={index}
							className={`w-48 h-10 items-center justify-center ${
								index === 0
									? "rounded-l-lg"
									: index === menuItems.length - 1
									  ? "rounded-r-lg"
									  : ""
							}`}
							style={[
								styles.selectorItem,
								{
									backgroundColor:
										selectedMarket === item
											? colors.primary
											: colors.backgroundTint,
								},
							]}
							onPress={() => {
								setSelectedMarket(item);
							}}>
							<Text
								className="text-xl"
								style={{
									fontFamily: "JosefinSans-Light",
									color:
										selectedMarket === item
											? colors.secondaryText
											: colors.primaryText,
								}}>
								{item}
							</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		</View>
	);
};

const stylesGenerator = () => {
	const colors = getThemeColors(useColorScheme());
	return StyleSheet.create({
		selectorItem: {
			backgroundColor: colors.backgroundTint,
			borderColor: colors.accent,
			borderWidth: 1,
		},
	});
};

export default MarketTypeSelector;
