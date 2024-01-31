import getThemeColors from "@constants/Colors";
import { useGroupOperations } from "@context/groups";
import { Link } from "expo-router";
import { useState } from "react";
import {
	Keyboard,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";

const createGroup = () => {
	const colors = getThemeColors();
	const { createGroup } = useGroupOperations();
	const [groupName, setGroupName] = useState("");
	const [inviteCode, setInviteCode] = useState("");
	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}>
			<View
				className="flex-1 w-full items-center justify-center"
				style={{ backgroundColor: colors.background }}>
				<Text
					className="text-lg"
					style={{
						fontFamily: "JosefinSans-Light",
						color: colors.primaryText,
					}}>
					Enter Group Name:
				</Text>
				<TextInput
					className="w-2/3 h-14 text-lg text-center rounded-xl mb-3"
					placeholder="Group Name"
					value={groupName}
					onChangeText={setGroupName}
					style={{
						backgroundColor: colors.backgroundTint,
						fontFamily: "JosefinSans-Regular",
						color: colors.accent,
					}}
				/>
				<Text
					className="text-lg"
					style={{
						fontFamily: "JosefinSans-Light",
						color: colors.primaryText,
					}}>
					Enter Invite Code:
				</Text>
				<TextInput
					className="w-2/3 h-14 text-lg text-center rounded-xl mb-3"
					placeholder="Invite Code"
					value={inviteCode}
					onChangeText={setInviteCode}
					style={{
						backgroundColor: colors.backgroundTint,
						fontFamily: "JosefinSans-Regular",
						color: colors.accent,
					}}
				/>
				<Link href="/groups" asChild>
					<TouchableOpacity
						className="h-14 w-40 rounded-xl my-3 items-center justify-center"
						style={{ backgroundColor: colors.primary }}
						onPress={() => {
							createGroup(groupName, inviteCode);
						}}>
						<Text
							className="text-lg"
							style={{
								fontFamily: "JosefinSans-Medium",
								color: colors.secondaryText,
							}}>
							Create Group
						</Text>
					</TouchableOpacity>
				</Link>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default createGroup;
