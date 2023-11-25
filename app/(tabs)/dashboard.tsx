import React, { useState } from "react";
import {
	Keyboard,
	TouchableWithoutFeedback,
	View,
	useColorScheme,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import LocationSelectorHeader from "../../components/LocationSelectorHeader";
import SearchBar from "../../components/SearchBar";
import getThemeColors from "../../constants/Colors";
import ItemCategoryList from "../../components/ItemCategoryList";
import { ScrollView } from "react-native-gesture-handler";
import { Item } from "../../utils/types";

const sample: Item = {
	photoURL: "https://picsum.photos/200/300?random=1",
	name: "Burgers",
	owner: "John Doe",
	cost: 10,
	costTime: "day",
	id: 0,
};
const sampleList: Item[] = Array(8)
	.fill(null)
	.map((_, index) => ({
		...sample,
		id: index + 5,
	}));

const Dashboard = () => {
	const colors = getThemeColors(useColorScheme());
	const [city, setCity] = useState("Ashburn");
	const [state, setState] = useState("VA");
	const [search, setSearch] = useState("");
	const [inSearch, setInSearch] = useState(false);

	const updateSearch = (search: string) => {
		setSearch(search);
	};
	return (
		<View
			className="flex-1 items-center"
			style={{ backgroundColor: colors.background }}>
			<TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); setInSearch(false) }}>
				<View className="flex-1 items-center w-full">
					<LocationSelectorHeader city={city} state={state} />
					<SearchBar search={search} updateSearch={updateSearch} setInSearch={setInSearch}/>
					{!inSearch ? (
						<View className="flex-1">
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
						</View>
					) : (
						<KeyboardAvoidingView
							className="flex-1 w-full items-center"
							behavior={
								Platform.OS === "ios" ? "padding" : "height"
							}
							keyboardVerticalOffset={-15}></KeyboardAvoidingView>
					)}
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};

export default Dashboard;
