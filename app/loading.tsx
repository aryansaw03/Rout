import { View, Text, ActivityIndicator, useColorScheme } from "react-native";
import Colors from "../constants/Colors";

const Loading = () => {
	const colorScheme = useColorScheme();
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: Colors[colorScheme ?? "light"].background,
				alignItems: "center",
				justifyContent: "center",
			}}>
			<ActivityIndicator />
		</View>
	);
};

export default Loading;
