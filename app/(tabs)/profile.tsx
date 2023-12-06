import { signOut } from "firebase/auth";
import React from "react";
import { Button, Text, View, useColorScheme } from "react-native";
import { auth } from "@FirebaseConfig";
import Header from "@components/Common/Header";
import getThemeColors from "@constants/Colors";

const Profile = () => {
	const colors = getThemeColors(useColorScheme());
	return (
		<View className="flex-1 items-center">
			<Header>
				<Text
					className="text-2xl mr-3"
					style={{
						color: colors.primaryText,
						fontFamily: "JosefinSans-Medium",
					}}>
					Profile
				</Text>
			</Header>
			<View className="flex-1 items-center justify-center">
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
		</View>
	);
};

export default Profile;
