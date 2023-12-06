import React from "react";
import { KeyboardTypeOptions, TextInput, useColorScheme } from "react-native";
import getThemeColors from "@constants/Colors";

type TextContentType =
	| "none"
	| "URL"
	| "addressCity"
	| "addressCityAndState"
	| "addressState"
	| "countryName"
	| "creditCardNumber"
	| "emailAddress"
	| "familyName"
	| "fullStreetAddress"
	| "givenName"
	| "jobTitle"
	| "location"
	| "middleName"
	| "name"
	| "namePrefix"
	| "nameSuffix"
	| "nickname"
	| "organizationName"
	| "postalCode"
	| "streetAddressLine1"
	| "streetAddressLine2"
	| "sublocality"
	| "telephoneNumber"
	| "username"
	| "password";

interface Props {
	placeholder?: string;
	value?: any;
	setValue?: (value: any) => void;
	keyboardType?: KeyboardTypeOptions;
	textContentType?: TextContentType;
	secureTextEntry?: boolean;
}

const AuthTextInput = ({
	placeholder,
	value,
	setValue,
	keyboardType,
	textContentType,
	secureTextEntry = false,
}: Props) => {
	const colors = getThemeColors(useColorScheme());
	return (
		<TextInput
			className="border-b-2 text-lg text-center w-full h-14"
			placeholder={placeholder}
			placeholderTextColor={colors.accent}
			value={value}
			onChangeText={setValue}
			keyboardType={keyboardType}
			textContentType={textContentType}
			secureTextEntry={secureTextEntry}
			style={{
				fontFamily: "JosefinSans-Regular",
				borderColor: colors.accent,
				color: colors.accent,
			}}
		/>
	);
};

export default AuthTextInput;
