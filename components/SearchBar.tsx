import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, View, useColorScheme } from "react-native";
import getThemeColors from "../constants/Colors";

const SearchBar = ({
	search,
	updateSearch,
	setInSearch,
}: {
	search: string;
	updateSearch: (search: string) => void;
	setInSearch: (inSearch: boolean) => void;
}) => {
	const colors = getThemeColors(useColorScheme());
	return (
		<View className="items-center w-full py-5">
			<View
				className="flex-row w-11/12 rounded-full items-center py-2"
				style={{
					backgroundColor: colors.backgroundTint,
					borderColor: colors.secondaryText,
					borderWidth: 1,
				}}>
				<Ionicons
					name="search"
					size={36}
					color={colors.primaryText}
					style={{ marginHorizontal: 20 }}
				/>
				<TextInput
					className="flex-1 text-xl"
					placeholder="Search for an item..."
					placeholderTextColor={colors.accent}
					value={search}
					onChangeText={updateSearch}
					onFocus={() => setInSearch(true)}
					style={{
						fontFamily: "JosefinSans-Light",
						color: colors.primaryText,
						lineHeight: 22,
					}}
				/>
			</View>
		</View>
	);
};

export default SearchBar;
