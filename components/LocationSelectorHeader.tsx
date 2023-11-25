import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	useColorScheme,
} from "react-native";
import getThemeColors from "../constants/Colors";

const LocationSelectorHeader = ({
	city,
	state,
}: {
	city: string;
	state: string;
}) => {
	const colors = getThemeColors(useColorScheme());
	return (
		<View
			className="w-full items-center pb-5 pt-16"
			style={[
				styles.bottomShadow,
				{ backgroundColor: colors.backgroundTint },
			]}>
			<Text
				style={{
					color: colors.primary,
					fontFamily: "JosefinSans-Regular",
				}}>
				Searching in...
			</Text>
			<TouchableOpacity className="flex-row items-center mt-3">
				<Text
					className="text-2xl mr-3"
					style={{
						color: colors.primaryText,
						fontFamily: "JosefinSans-Medium",
					}}>
					{city}, {state}
				</Text>
				<FontAwesome
					name="chevron-down"
					size={18}
					color={colors.primaryText}
				/>
			</TouchableOpacity>
		</View>
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

export default LocationSelectorHeader;
