import getThemeColors from "@constants/Colors";
import { Item } from "@utils/Types";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
const ItemStatus = ({
	item,
	itemStatus,
}: {
	item: Item;
	itemStatus: "Pending" | "Completed" | "Canceled";
}) => {
	const colors = getThemeColors();
	return (
		<TouchableOpacity>
			<View
				className="w-96 py-3 px-5 rounded-2xl border flex-row justify-between items-center"
				style={{
					backgroundColor: colors.backgroundTint,
					borderColor: colors.secondaryText,
				}}>
				<Image
					className="w-16 h-12 bg-black"
					source={{
						uri: item.photoURL,
					}}
					resizeMode="contain"
				/>

				<View className="items-end">
					<Text
						className="text-2xl"
						style={{
							fontFamily: "JosefinSans-Medium",
							color: colors.primaryText,
						}}>
						{item.name}
					</Text>
					<Text
						className="text-sm"
						style={{
							fontFamily: "JosefinSans-Bold",
							color:
								itemStatus === "Completed"
									? "#4db14d"
									: itemStatus === "Canceled"
									  ? "#ff8080"
									  : "#808080",
						}}>
						{itemStatus}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default ItemStatus;
