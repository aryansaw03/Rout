import AuthTextInput from "@components/Auth/AuthTextInput";
import getThemeColors from "@constants/Colors";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { auth } from "@FirebaseConfig";
import { useRouter } from "expo-router";
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

const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const colors = getThemeColors();
	const router = useRouter();
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
							className="text-2xl"
							style={{
								color: colors.secondaryText,
								fontFamily: "JosefinSans-Bold",
							}}>
							Create your Account
						</Text>
					</View>
					<KeyboardAvoidingView
						className="flex-1 w-full items-center"
						behavior={Platform.OS === "ios" ? "padding" : "height"}
						keyboardVerticalOffset={-15}>
						<View
							className="flex-1 w-3/4 items-center justify-evenly"
							style={{ maxHeight: 400 }}>
							<AuthTextInput
								placeholder="Username"
								value={username}
								setValue={setUsername}
								textContentType="username"
							/>
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
									createUserWithEmailAndPassword(
										auth,
										email,
										password
									)
										.then((userCredential) => {
											console.log(
												"signed up and logged in"
											);
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
								<Text
									className="text-xl"
									style={{
										fontFamily: "JosefinSans-Light",
										color: colors.secondaryText,
									}}>
									Register
								</Text>
							</TouchableOpacity>
							<View className="flex-row justify-center">
								<Text
									className="mr-1"
									style={{
										fontFamily: "JosefinSans-Regular",
										color: colors.primaryText,
									}}>
									Have an account?
								</Text>
								<TouchableOpacity
									onPress={() => {
										router.push("/sign-in");
									}}>
									<Text
										className="text-sky-600"
										style={{
											fontFamily: "JosefinSans-Regular",
										}}>
										Sign in here!
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

export default Register;
