import { View, Text, useColorScheme, StyleSheet } from "react-native";
import React from "react";
import getThemeColors from "../../constants/Colors";
import LocationSelectorHeader from "../../components/LocationSelectorHeader";

const Dashboard = () => {
	const colors = getThemeColors(useColorScheme());
	const [city, setCity] = React.useState("Ashburn");
	const [state, setState] = React.useState("VA");
	return (
		<View
			className="flex-1 items-center"
			style={{ backgroundColor: colors.background }}>
			<LocationSelectorHeader city={city} state={state} />
		</View>
	);
};

export default Dashboard;
