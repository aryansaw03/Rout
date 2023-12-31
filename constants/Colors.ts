import { useColorScheme } from "react-native";
const defaultColors = {
	white: "#ffffff",
	black: "#000000",
};

export const lightColors = {
	primary: "#a9fbc3",
	primaryText: "#000000",
	secondaryText: "#2F2F2F",
	accent: "#999999",
	background: "#ffffff",
	backgroundTint: "#ffffff",
	...defaultColors,
};

export const darkColors = {
	primary: "#a9fbc3",
	primaryText: "#ffffff",
	secondaryText: "#1E1E1E",
	accent: "#ffffff",
	background: "#2F2F2F",
	backgroundTint: "#1E1E1E",
	...defaultColors,
};

export default function getThemeColors() {
	return useColorScheme() === "light" ? lightColors : darkColors;
}
