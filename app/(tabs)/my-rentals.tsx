import { View, Text, useColorScheme, FlatList } from "react-native";
import React from "react";
import Header from "../../components/Header";
import getThemeColors from "../../constants/Colors";
import { Item } from "../../utils/Types";
import ItemStatus from "../../components/ItemStatus";

const sample: Item = {
	photoURL: "",
	name: "Burgers",
	owner: "John Doe",
	cost: 10,
	costTime: "day",
	id: 0,
};
const sampleList: Item[] = Array(10)
	.fill(null)
	.map((_, index) => ({
		...sample,
		photoURL: `https://picsum.photos/300/200?random=${index}`,
		id: index + 5,
	}));

type StatusItem = {
	item: Item;
	itemStatus: "Pending" | "Completed" | "Canceled";
};

const sampleStatusItemList: StatusItem[] = sampleList.map((item) => ({
	item: item,
	itemStatus: ["Pending", "Completed", "Canceled"][
		Math.floor(Math.random() * 3)
	] as "Pending" | "Completed" | "Canceled",
}));

const MyRentals = () => {
	const colors = getThemeColors(useColorScheme());
	return (
		<View
			className="flex-1 items-center"
			style={{ backgroundColor: colors.background }}>
			<Header>
				<Text
					className="text-2xl mr-3"
					style={{
						color: colors.primaryText,
						fontFamily: "JosefinSans-Medium",
					}}>
					My Rentals
				</Text>
			</Header>
			<View className="flex-1 items-center w-full">
				<FlatList
					style={{ width: "100%" }}
					data={sampleStatusItemList}
					renderItem={({ item }) => (
						<ItemStatus item={item.item} itemStatus={item.itemStatus} />
					)}
					keyExtractor={(item) => item.item.id.toString()}
					contentContainerStyle={{
						gap: 30,
						paddingVertical: 30,
						alignItems: "center",
					}}
				/>
			</View>
		</View>
	);
};

export default MyRentals;
