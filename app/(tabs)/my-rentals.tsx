import { View, Text, useColorScheme } from "react-native";
import React from "react";
import Header from "../../components/Header";
import getThemeColors from "../../constants/Colors";

const MyRentals = () => {
	const colors = getThemeColors(useColorScheme());
	return (
		<View>
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
		</View>
	);
};

export default MyRentals;
