import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
	useColorScheme,
} from "react-native";
import { auth } from "../../FirebaseConfig";
import getThemeColors from "../../constants/Colors";

const SignIn = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const styles = styleGenerator();
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.innerContainer}>
					{error && <Text style={{ color: "red" }}>{error}</Text>}
					<TextInput
						style={styles.input}
						placeholder="Username"
						placeholderTextColor="grey"
						value={username}
						onChangeText={setUsername}
						textContentType="username"
					/>
					<TextInput
						style={styles.input}
						placeholder="Email"
						placeholderTextColor="grey"
						value={email}
						onChangeText={setEmail}
						keyboardType="email-address"
						textContentType="emailAddress"
					/>
					<TextInput
						style={styles.input}
						placeholder="Password"
						placeholderTextColor="grey"
						value={password}
						secureTextEntry={true}
						onChangeText={setPassword}
						textContentType="newPassword"
					/>
					<Pressable
						style={styles.button}
						onPress={() => {
							createUserWithEmailAndPassword(
								auth,
								email,
								password
							)
								.then((userCredential) => {
									console.log("signed up and logged in");
									updateProfile(userCredential.user, {
										displayName: username,
									}).then(() => {
										console.log("updated username");
									});
								})
								.catch((error) => {
									setError(error.code);
								});
						}}>
						<Text style={styles.buttonText}>Register Now</Text>
					</Pressable>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

const styleGenerator = () => {
	const colors = getThemeColors(useColorScheme());
	return StyleSheet.create({
		container: {
			flex: 1,
		},
		innerContainer: {
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
		},
		input: {
			width: 400,
			borderRadius: 20,
			padding: 20,
			marginVertical: 10,
			backgroundColor: colors.background,
		},
		button: {
			width: 300,
			alignItems: "center",
			justifyContent: "center",
			padding: 20,
			borderRadius: 20,
			marginVertical: 10,
			backgroundColor: "blue",
		},
		buttonText: {
			fontSize: 16,
			lineHeight: 21,
			fontWeight: "bold",
			letterSpacing: 0.25,
			color: "white",
		},
	});
};

export default SignIn;
