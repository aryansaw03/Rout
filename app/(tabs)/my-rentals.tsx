import ItemStatus from "@components/MyRentals/ItemStatus";
import getThemeColors from "@constants/Colors";
import { Item } from "@utils/Types";
import React from "react";
import { FlatList, View } from "react-native";

const sample: Item = {
	photoURL: "",
	name: "Burgers",
	owner: "John Doe",
	cost: 10,
	costTime: "day",
	id: "",
};
const sampleList: Item[] = Array(10)
	.fill(null)
	.map((_, index) => ({
		...sample,
		photoURL: `https://picsum.photos/300/200?random=${index}`,
		id: "" + index + 5,
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
	const colors = getThemeColors();
	return (
		<View
			className="flex-1 w-full items-center"
			style={{ backgroundColor: colors.background }}>
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
	);
};

export default MyRentals;
