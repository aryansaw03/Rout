import GroupSelector from "@components/MarketSelector/GroupSelector";
import LocationSelector from "@components/MarketSelector/LocationSelector";
import MarketTypeSelector from "@components/MarketSelector/MarketTypeSelector";
import { useMarket } from "@context/market";
import React from "react";
import { View, Text } from "react-native";

const MarketSelector = () => {
	const { market } = useMarket();
	const [selectedMarketType, setSelectedMarketType] = React.useState<string>(market!.type);
	const marketTypes = ["location", "group"];
	const renderSelectedMarket = () => {
		switch (selectedMarketType) {
			case "location":
				return <LocationSelector />;
			case "group":
				return <GroupSelector />;
			default:
				return null;
		}
	};
	return (
		<View className="flex-1 items-center">
			<MarketTypeSelector
				marketTypes={marketTypes}
				selectedMarketType={selectedMarketType}
				setSelectedMarketType={setSelectedMarketType}
			/>
			{renderSelectedMarket()}
		</View>
	);
};

export default MarketSelector;
