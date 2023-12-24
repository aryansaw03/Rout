import ItemCategoryList from "@components/Dashboard/ItemCategoryList";
import SearchBar from "@components/Dashboard/SearchBar";
import getThemeColors from "@constants/Colors";
import { Item } from "@utils/Types";
import React, { useState } from "react";
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const sample: Item = {
	photoURL: "",
	name: "Burgers",
	owner: "John Doe",
	cost: 10,
	costTime: "day",
	id: "",
};
const sampleList: Item[] = Array(8)
	.fill(null)
	.map((_, index) => ({
		...sample,
		photoURL: `https://picsum.photos/300/200?random=${index}`,
		id: "" + index + 5,
	}));

const Dashboard = () => {
	const colors = getThemeColors();
	const [search, setSearch] = useState("");
	const [inSearch, setInSearch] = useState(false);

	const updateSearch = (search: string) => {
		setSearch(search);
	};
	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
				setInSearch(false);
			}}>
			<View
				className="flex-1 items-center w-full"
				style={{ backgroundColor: colors.background }}>
				<SearchBar
					search={search}
					updateSearch={updateSearch}
					setInSearch={setInSearch}
				/>
				{!inSearch ? (
					<ScrollView>
						<ItemCategoryList
							title="Popular Items Near You"
							itemList={sampleList}
						/>
						<ItemCategoryList
							title="Based on Your Past Orders"
							itemList={sampleList}
						/>
						<ItemCategoryList
							title="Recommended for You"
							itemList={sampleList}
						/>
					</ScrollView>
				) : (
					<KeyboardAvoidingView
						className="flex-1 w-full items-center"
						behavior={Platform.OS === "ios" ? "padding" : "height"}
						keyboardVerticalOffset={-15}></KeyboardAvoidingView>
				)}
			</View>
		</TouchableWithoutFeedback>
	);
};

export default Dashboard;
