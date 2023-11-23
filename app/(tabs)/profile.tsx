import { signOut } from "firebase/auth";
import React from "react";
import { Button, View } from "react-native";
import { auth } from "../../FirebaseConfig";

const Profile = () => {
	return (
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
	);
};

export default Profile;
