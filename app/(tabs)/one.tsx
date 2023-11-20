import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../context/auth";

export default function TabOneScreen() {
	const user = useAuth()!;
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{user.displayName}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
});
