const defaultColors = {
    white: "#ffffff",
    black: "#000000",
}

export const lightColors = {
	primary: "#a9fbc3",
	primaryText: "#000000",
	secondaryText: "#ffffff",
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

export default function getThemeColors(theme: "light" | "dark" | undefined | null) {
	return theme === "light" ? lightColors : darkColors;
}
