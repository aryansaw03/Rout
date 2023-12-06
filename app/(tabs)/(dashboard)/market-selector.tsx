import MarketTypeSelector from "@components/MarketSelector/MarketTypeSelector";
import React from "react";
import { View, Text } from "react-native";

const MarketSelector = () => {
	const [selectedMarket, setSelectedMarket] = React.useState("Location");
	const menuItems = ["Location", "Group"];
	return (
		<View className="flex-1 items-center">
			<MarketTypeSelector
				menuItems={menuItems}
				selectedMarket={selectedMarket}
				setSelectedMarket={setSelectedMarket}
			/>
			<View className="flex-1">
				<Text>{selectedMarket}</Text>
			</View>
		</View>
	);
};

export default MarketSelector;
