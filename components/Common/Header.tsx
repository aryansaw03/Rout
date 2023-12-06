import { View, Text, StyleSheet, useColorScheme } from "react-native";
import React from "react";
import getThemeColors from "@constants/Colors";

const Header = ({ children }: { children: React.ReactNode }) => {
	const colors = getThemeColors(useColorScheme());
	return (
		<View
			className="w-full h-36 pb-3 items-center justify-end"
			style={[
				styles.bottomShadow,
				{ backgroundColor: colors.backgroundTint },
			]}>
			{children}
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

export default Header;
