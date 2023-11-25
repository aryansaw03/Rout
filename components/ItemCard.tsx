import { View, Text, TouchableOpacity, Image, useColorScheme, StyleSheet } from "react-native";
import React from "react";
import { Item } from "../utils/types";
import getThemeColors from "../constants/Colors";

const ItemCard = ({ item }: { item: Item }) => {
	const colors = getThemeColors(useColorScheme());
	return (
		<TouchableOpacity>
			<View className="bg-white w-52 rounded-2xl items-center" style={styles.bottomShadow}>
				<Image
					className="w-full h-36 rounded-t-2xl"
					source={{
						uri: item.photoURL,
					}}
					resizeMode="cover"
				/>
				<View className="w-full p-3">
					<Text
						className="mb-1"
						style={{
							fontFamily: "JosefinSans-Medium",
							color: colors.secondaryText,
						}}>
						{item.name}
					</Text>
					<Text
						className="mb-1"
						style={{
							fontFamily: "JosefinSans-Light",
							color: colors.secondaryText,
						}}>
						{item.owner}
					</Text>
					<Text
						style={{
							fontFamily: "JosefinSans-Light",
							color: colors.secondaryText,
						}}>
						$ {item.cost} / {item.costTime}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	bottomShadow: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.4,
		shadowRadius: 4,
		elevation: 5,
	},
});

export default ItemCard;
