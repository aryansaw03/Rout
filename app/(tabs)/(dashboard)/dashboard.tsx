import Header from "@components/Common/Header";
import ItemCategoryList from "@components/Dashboard/ItemCategoryList";
import SearchBar from "@components/Dashboard/SearchBar";
import getThemeColors from "@constants/Colors";
import { useMarket } from "@context/market";
import { FontAwesome } from "@expo/vector-icons";
import { Item } from "@utils/Types";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
	useColorScheme,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const sample: Item = {
	photoURL: "",
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
		photoURL: `https://picsum.photos/300/200?random=${index}`,
		id: index + 5,
	}));

const Dashboard = () => {
	const colors = getThemeColors();
	const [city, setCity] = useState("Ashburn");
	const [state, setState] = useState("VA");
	const [search, setSearch] = useState("");
	const [inSearch, setInSearch] = useState(false);
	const { market } = useMarket();

	const updateSearch = (search: string) => {
		setSearch(search);
	};
	return (
		<View
			className="flex-1 items-center"
			style={{ backgroundColor: colors.background }}>
			<TouchableWithoutFeedback
				onPress={() => {
					Keyboard.dismiss();
					setInSearch(false);
				}}>
				<View className="flex-1 items-center w-full">
					<Header>
						<Text
							style={{
								color: colors.primary,
								fontFamily: "JosefinSans-Regular",
							}}>
							Searching in...
						</Text>
						<Link href="/market-selector" asChild>
							<TouchableOpacity className="flex-row items-center mt-2">
								<Text
									className="text-2xl mr-3"
									style={{
										color: colors.primaryText,
										fontFamily: "JosefinSans-Medium",
									}}>
									{market?.type === "group"
										? market?.name
										: market?.city + ", " + market?.state}
								</Text>
								<FontAwesome
									name="chevron-down"
									size={18}
									color={colors.primaryText}
								/>
							</TouchableOpacity>
						</Link>
					</Header>
					<SearchBar
						search={search}
						updateSearch={updateSearch}
						setInSearch={setInSearch}
					/>
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
