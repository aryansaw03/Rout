import getThemeColors from "@constants/Colors";
import { useMarket } from "@context/market";
import { LocationMarket } from "@utils/Types";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

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
			{availableLocations.map((loc, index) => {
				return (
					<TouchableOpacity
						key={index}
						className="w-3/4 py-4 items-center border rounded-2xl my-2"
						style={{ borderColor: colors.accent }}
						onPress={() => {
							setMarket(loc);
							router.back();
						}}>
						<Text
							className="text-lg"
							style={{
								color: colors.primaryText,
								fontFamily: "JosefinSans-Regular",
							}}>
							{loc.city}, {loc.state}
						</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

export default LocationSelector;
