import { auth } from "@FirebaseConfig";
import getThemeColors from "@constants/Colors";
import { signOut } from "firebase/auth";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Profile = () => {
	const colors = getThemeColors();
	return (
		<View
			className="flex-1 w-full items-center justify-center"
			style={{ backgroundColor: colors.background }}>
			<TouchableOpacity
				className="py-5 px-10 rounded-3xl"
				style={{ backgroundColor: colors.backgroundTint }}
				onPress={() => {
					signOut(auth)
						.then(() => {
							console.log("Sign-out successful.");
						})
						.catch((error) => {
							console.log(error.message);
						});
				}}>
				<Text
					className="text-xl"
					style={{
						fontFamily: "JosefinSans-Medium",
						color: colors.primaryText,
					}}>
					Sign out
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Profile;
