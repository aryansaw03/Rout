import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
	ImageBackground,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
	useColorScheme,
} from "react-native";
import { auth } from "../../FirebaseConfig";
import AuthTextInput from "../../components/AuthTextInput";
import getThemeColors from "../../constants/Colors";

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const colors = getThemeColors(useColorScheme());
	const router = useRouter();
	return (
		<ImageBackground
			className="w-full h-full"
			style={{ backgroundColor: colors.background }}
			resizeMode="cover"
			source={require("../../assets/images/auth-background.png")}>
			<KeyboardAvoidingView
				className="w-full h-full"
				behavior={Platform.OS === "ios" ? "padding" : "height"}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View className="flex-1 items-center">
						<View className="pt-40 h-72 justify-end">
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
						<View className="flex-1 max-h-96 w-9/12 items-center justify-end">
							{error && (
								<Text style={{ color: "red" }}>{error}</Text>
							)}
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
								className="rounded-2xl w-48 h-12 items-center justify-center mt-4"
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
							<View className="flex-row justify-center mt-8">
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
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</ImageBackground>
	);
};

export default SignIn;
