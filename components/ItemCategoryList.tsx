import React from "react";
import {
	FlatList,
	Text,
	View,
	useColorScheme
} from "react-native";
import getThemeColors from "../constants/Colors";
import { Item } from "../utils/Types";
import ItemCard from "./ItemCard";

const ItemCategoryList = ({
	title,
	itemList,
}: {
	title: string;
	itemList: Item[];
}) => {
	const colors = getThemeColors(useColorScheme());
	return (
		<View className="justify-center py-2">
			<Text
				className="pb-2 pl-5 text-2xl"
				style={{
					fontFamily: "JosefinSans-Medium",
					color: colors.primaryText,
				}}>
				{title}
			</Text>
			<FlatList
				horizontal
				data={itemList}
				renderItem={({ item }) => <ItemCard item={item} />}
				keyExtractor={(item) => item.id.toString()}
				contentContainerStyle={{ gap: 20, paddingVertical: 10, paddingHorizontal: 20}}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};

export default ItemCategoryList;
