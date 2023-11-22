import { Button, StyleSheet } from "react-native";

import { signOut } from "firebase/auth";
import { View } from "react-native";
import { auth } from "../../FirebaseConfig";

export default function TabTwoScreen() {
	return (
		<View style={styles.container}>
			<Button
				title="Sign Out"
				onPress={() => {
					signOut(auth)
						.then(() => {
							console.log("Sign-out successful.");
						})
						.catch((error) => {
							console.log(error.message);
						});
				}}
			/>
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
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
