import getThemeColors from "@constants/Colors";
import { useMarket } from "context/market";
import { LocationMarket } from "@utils/Types";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import MarketSelector from "@components/Common/MarketSelector";

const LocationSelector = () => {
	const colors = getThemeColors();
	const { setMarket } = useMarket();
	const router = useRouter();
	const availableLocations: LocationMarket[] = [
		{
			type: "location",
			city: "Charlottesville",
			state: "VA",
			longitude: 39.0438,
			latitude: 77.4874,
		},
		{
			type: "location",
			city: "Ashburn",
			state: "VA",
			longitude: 39.0438,
			latitude: 77.4874,
		},
	];
	return (
		<View
			className="flex-1 w-full items-center"
			style={{ backgroundColor: colors.background }}>
			{/* <MapView
				style={StyleSheet.absoluteFill}
				provider={PROVIDER_GOOGLE}
				showsUserLocation
				showsMyLocationButton
			/> */}
			<Text
				className="text-2xl mb-2"
				style={{
					color: colors.primaryText,
					fontFamily: "JosefinSans-Regular",
				}}>
				Available locations...
			</Text>
			<FlatList
				style={{ width: "100%" }}
				data={availableLocations}
				renderItem={({ item }) => (
					<MarketSelector item={item}>
						<Text
							className="text-xl"
							style={{
								fontFamily: "JosefinSans-Regular",
								color: colors.primaryText,
							}}>
							{item.city}, {item.state}
						</Text>
					</MarketSelector>
				)}
				keyExtractor={(_, index) => index.toString()}
				contentContainerStyle={{
					gap: 15,
					paddingVertical: 15,
					alignItems: "center",
				}}
			/>
		</View>
	);
};

export default LocationSelector;
