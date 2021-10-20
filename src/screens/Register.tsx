import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	Dimensions,
	ScrollView,
	StyleSheet,
} from "react-native";

import fonts from "../styles/fonts";
import colors from "../styles/colors";
import logo from "../../assets/logo.png";
import { createUser } from "../services";
import RolePicker from "../components/Picker";
import { UserProps } from "../utils/Interfaces";
import SubmitButton from "../components/SubmitButton";
import DefaultInput from "../components/DefaultInput";
import RegisterAnimation from "../components/RegisterAnimation";

const { width } = Dimensions.get("window");

export default function Register({ route, navigation }: any) {
	// Name States
	const [name, setName] = useState("");
	const [isNameFocused, setIsNameFocused] = useState(false);
	const [isNameInvalid, setIsNameInvalid] = useState(false);

	// Email States
	const [email, setEmail] = useState("");
	const [isEmailFocused, setIsEmailFocused] = useState(false);
	const [isEmailInvalid, setIsEmailInvalid] = useState(false);

	// CPF States
	const [cpf, setCpf] = useState("");
	const [isCpfFocused, setIsCpfFocused] = useState(false);
	const [isCpfInvalid, setIsCpfInvalid] = useState(false);

	// Position States
	const [position, setPosition] = useState("");
	const [isPositionFocused, setIsPositionFocused] = useState(false);
	const [isPositionInvalid, setIsPositionInvalid] = useState(false);

	// Password States
	const [password, setPassword] = useState("");
	const [isPasswordFocused, setIsPasswordFocused] = useState(false);
	const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
	const [isPasswordHidden, setIsPasswordHidden] = useState(true);
	const [passwordIcon, setPasswordIcon] = useState<"eye" | "eye-off">("eye");

	// Role States
	const userData: UserProps = route.params;
	const [role, setRole] = useState<"admin" | "analist" | "viewer">("viewer");

	// General
	const [isLoading, setIsLoading] = useState(false);
	const inputs = [
		{
			name: "name",
			value: name,
			function: setIsNameInvalid,
		},
		{
			name: "email",
			value: email,
			function: setIsEmailInvalid,
		},
		{
			name: "password",
			value: password,
			function: setIsPasswordInvalid,
		},
		{
			name: "cpf",
			value: cpf,
			function: setIsCpfInvalid,
		},
		{
			name: "position",
			value: position,
			function: setIsPositionInvalid,
		},
	];

	// Name Functions
	function handleNameValue(value: string) {
		if (isNameInvalid) {
			setIsNameInvalid(false);
		}

		setName(value);
	}

	function handleNameFocus() {
		if (name !== "" || !isNameFocused) {
			setIsNameFocused(true);
		} else {
			setIsNameFocused(false);
		}
	}

	// Email Functions
	function handleEmailValue(value: string) {
		if (isEmailInvalid) {
			setIsEmailInvalid(false);
		}

		setEmail(value);
	}

	function handleEmailFocus() {
		if (email !== "" || !isEmailFocused) {
			setIsEmailFocused(true);
		} else {
			setIsEmailFocused(false);
		}
	}

	// CPF Functions
	function handleCpfValue(value: string) {
		if (isCpfInvalid) {
			setIsCpfInvalid(false);
		}

		setCpf(value);
	}

	function handleCpfFocus() {
		if (cpf !== "" || !isCpfFocused) {
			setIsCpfFocused(true);
		} else {
			setIsCpfFocused(false);
		}
	}

	// Postion Functions
	function handlePositionValue(value: string) {
		if (isPositionInvalid) {
			setIsPositionInvalid(false);
		}

		setPosition(value);
	}

	function handlePositionFocus() {
		if (position !== "" || !isPositionFocused) {
			setIsPositionFocused(true);
		} else {
			setIsPositionFocused(false);
		}
	}

	// Password Functions
	function handlePasswordValue(value: string) {
		if (isPasswordInvalid) {
			setIsPasswordInvalid(false);
		}

		setPassword(value);
	}

	function handlePasswordFocus() {
		if (password !== "" || !isPasswordFocused) {
			setIsPasswordFocused(true);
		} else {
			setIsPasswordFocused(false);
		}
	}

	function handlePasswordVisibility() {
		setIsPasswordHidden(!isPasswordHidden);

		if (isPasswordHidden) {
			setPasswordIcon("eye-off");
		} else {
			setPasswordIcon("eye");
		}
	}

	// Role Functions
	function handleRoleValue(value: "admin" | "analist" | "viewer") {
		setRole(value);
	}

	// Submit Functions
	function verifyInputs() {
		let hasError = false;

		inputs.forEach((input) => {
			if (input.value === "") {
				input.function(true);
				hasError = true;
			}
		});

		return hasError;
	}

	function submit() {
		setIsLoading(true);
		let hasError = verifyInputs();
		if (hasError) return;

		const user = {
			name: name,
			email: email,
			password: password,
			cpf: cpf,
			login: email,
			position: position,
			role: role,
		};

		createUser(user);
		setIsLoading(false);
		navigation.navigate("Home", userData);
	}

	return (
		<>
			<ScrollView>
				<View style={styles.container}>
					<Image style={styles.logo} source={logo} />

					<RegisterAnimation margin={-35} />

					<View style={styles.form}>
						<Text style={styles.formTitle}>Cadastrar</Text>

						<DefaultInput
							placeholder={"Nome"}
							isInvalid={isNameInvalid}
							isFocused={isNameFocused}
							onFocus={handleNameFocus}
							onBlur={handleNameFocus}
							onChangeText={(text) => handleNameValue(text)}
						/>

						<DefaultInput
							placeholder={"Email"}
							isInvalid={isEmailInvalid}
							isFocused={isEmailFocused}
							onFocus={handleEmailFocus}
							onBlur={handleEmailFocus}
							onChangeText={(text) => handleEmailValue(text)}
						/>

						<DefaultInput
							type={"password"}
							placeholder={"Senha"}
							isInvalid={isPasswordInvalid}
							isFocused={isPasswordFocused}
							onFocus={handlePasswordFocus}
							onBlur={handlePasswordFocus}
							onChangeText={(text) => handlePasswordValue(text)}
							isPasswordHidden={isPasswordHidden}
							handlePasswordVisibility={handlePasswordVisibility}
							passwordInputIcon={passwordIcon}
						/>

						<DefaultInput
							placeholder={"CPF"}
							maxLength={14}
							isInvalid={isCpfInvalid}
							isFocused={isCpfFocused}
							onFocus={handleCpfFocus}
							onBlur={handleCpfFocus}
							onChangeText={(text) => handleCpfValue(text)}
						/>

						<DefaultInput
							placeholder={"Cargo"}
							isInvalid={isPositionInvalid}
							isFocused={isPositionFocused}
							onFocus={handlePositionFocus}
							onBlur={handlePositionFocus}
							onChangeText={(text) => handlePositionValue(text)}
						/>

						<RolePicker oldRole={role} onChange={handleRoleValue} />

						<SubmitButton
							text={"Pronto!"}
							isLoading={isLoading}
							onPress={submit}
						/>
					</View>
				</View>
			</ScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",

		backgroundColor: colors.green_bright,
	},

	logo: {
		width: width * 0.6,
		resizeMode: "contain",
	},

	form: {
		width: width,
		marginTop: -55,
		paddingVertical: 44,
		paddingHorizontal: 32,

		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		backgroundColor: colors.white,

		justifyContent: "center",
	},

	formTitle: {
		fontSize: 24,
		color: colors.black,
		fontFamily: fonts.bold,

		marginBottom: 20,
	},

	rolePicker: {
		marginBottom: 20,
		color: colors.green,
	},

	rolePickerItem: {
		fontSize: 18,
		fontFamily: fonts.regular,
		color: colors.green,
	},
});
