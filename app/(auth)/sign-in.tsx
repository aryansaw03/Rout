import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
	Alert,
	ImageBackground,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
	useColorScheme,
} from "react-native";
import { auth } from "@FirebaseConfig";
import AuthTextInput from "@components/Auth/AuthTextInput";
import getThemeColors from "@constants/Colors";

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const colors = getThemeColors();
	const router = useRouter();

	if (error) {
		Alert.alert("Invalid Credentials", "Please try again", [
			{
				text: "OK",
				onPress: () => {
					setError(null);
				},
			},
		]);
	}

	return (
		<ImageBackground
			className="flex-1"
			style={{ backgroundColor: colors.background }}
			resizeMode="cover"
			source={require("@assets/images/auth-background.png")}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View className="flex-1 items-center">
					<View className="h-2/5 pb-20 justify-end">
						<Text
							className="text-5xl"
							style={{
								color: colors.secondaryText,
								fontFamily: "JosefinSans-Light",
							}}>
							Hello,
						</Text>
						<Text
							className="text-2xl mt-10"
							style={{
								color: colors.secondaryText,
								fontFamily: "JosefinSans-Bold",
							}}>
							Sign into your Account
						</Text>
					</View>
					<KeyboardAvoidingView
						className="flex-1 w-full items-center"
						behavior={Platform.OS === "ios" ? "padding" : "height"}
						keyboardVerticalOffset={-50}>
						<View
							className="flex-1 w-3/4 items-center justify-evenly"
							style={{ maxHeight: 400 }}>
							<AuthTextInput
								placeholder="Email"
								value={email}
								setValue={setEmail}
								keyboardType="email-address"
								textContentType="emailAddress"
							/>
							<AuthTextInput
								placeholder="Password"
								value={password}
								setValue={setPassword}
								textContentType="password"
								secureTextEntry={true}
							/>
							<TouchableOpacity
								className="rounded-2xl w-48 h-12 items-center justify-center"
								style={{ backgroundColor: colors.primary }}
								onPress={() => {
									signInWithEmailAndPassword(
										auth,
										email,
										password
									)
										.then((userCredential) => {
											console.log("logged in");
										})
										.catch((error) => {
											setError(error.code);
										});
								}}>
								<Text
									className="text-xl"
									style={{
										fontFamily: "JosefinSans-Light",
										color: colors.secondaryText,
									}}>
									Sign In
								</Text>
							</TouchableOpacity>
							<View className="flex-row justify-center">
								<Text
									className="mr-1"
									style={{
										fontFamily: "JosefinSans-Regular",
										color: colors.primaryText,
									}}>
									Don't have an account?
								</Text>
								<TouchableOpacity
									onPress={() => {
										router.push("/register");
									}}>
									<Text
										className="text-sky-600"
										style={{
											fontFamily: "JosefinSans-Regular",
										}}>
										Register here!
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</KeyboardAvoidingView>
				</View>
			</TouchableWithoutFeedback>
		</ImageBackground>
	);
};

export default SignIn;
