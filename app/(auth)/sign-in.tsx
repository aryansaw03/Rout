import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
	ColorSchemeName,
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
import Colors from "../../constants/Colors";

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const colorScheme = useColorScheme();
	const styles = styleCreator(colorScheme);
	const router = useRouter();
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "height" : "height"}
			style={styles.container}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.innerContainer}>
					{error && <Text style={{ color: "red" }}>{error}</Text>}
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
						onChangeText={setPassword}
						secureTextEntry={true}
						textContentType="password"
					/>
					<Pressable
						style={styles.button}
						onPress={() => {
							signInWithEmailAndPassword(auth, email, password)
								.then((userCredential) => {
									console.log("logged in");
								})
								.catch((error) => {
									setError(error.code);
								});
						}}>
						<Text style={styles.buttonText}>Sign In</Text>
					</Pressable>
					<Pressable
						style={[styles.button, { backgroundColor: "grey" }]}
						onPress={() => {
							router.push("/(auth)/register");
						}}>
						<Text style={styles.buttonText}>Register</Text>
					</Pressable>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

const styleCreator = (colorScheme: ColorSchemeName) =>
	StyleSheet.create({
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
			backgroundColor: Colors[colorScheme ?? "light"].tint,
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

export default SignIn;
