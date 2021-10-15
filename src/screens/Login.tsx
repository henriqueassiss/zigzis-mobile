import React, { useState } from "react";
import {
	View,
	Text,
	Alert,
	Image,
	ScrollView,
	Dimensions,
	StyleSheet,
} from "react-native";

import fonts from "../styles/fonts";
import colors from "../styles/colors";
import logo from "../../assets/logo.png";
import { loginUser } from "../services/index";
import { UserProps } from "../utils/Interfaces";
import SubmitButton from "../components/SubmitButton";
import DefaultInput from "../components/DefaultInput";
import RegisterAnimation from "../components/RegisterAnimation";

const { width, height } = Dimensions.get("window");

export default function Login({ navigation }: any) {
	// Email States
	const [email, setEmail] = useState("");
	const [isEmailFocused, setIsEmailFocused] = useState(false);
	const [isEmailInvalid, setIsEmailInvalid] = useState(false);

	// Password States
	const [password, setPassword] = useState("");
	const [isPasswordFocused, setisPasswordFocused] = useState(false);
	const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
	const [isPasswordHidden, setIsPasswordHidden] = useState(true);
	const [passwordIcon, setPasswordIcon] = useState<"eye" | "eye-off">("eye");

	// General
	const [isLoading, setIsLoading] = useState(false);
	const alertData = {
		title: "Dados Incorretos",
		message: "Usuário ou senha incorreta, tente novamente.",
	};

	// Email Functions
	function handleEmailValue(value: string) {
		setEmail(value);
		setIsEmailInvalid(false);
	}

	function handleEmailFocus() {
		if (email !== "" || !isEmailFocused) {
			setIsEmailFocused(true);
		} else {
			setIsEmailFocused(false);
		}
	}

	// Password Functions
	function handlePasswordValue(value: string) {
		setPassword(value);
		setIsPasswordInvalid(false);
	}

	function handlePasswordFocus() {
		if (password !== "" || !isPasswordFocused) {
			setisPasswordFocused(true);
		} else {
			setisPasswordFocused(false);
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

	// Submit Functions
	async function submit() {
		setIsLoading(true);

		const user = {
			login: email,
			password: password,
		};

		const response = await loginUser(user);

		if (response) {
			const userData: UserProps = {
				name: response.name,
				role: response.role,
			};

			setIsLoading(false);

			if (userData.role === "admin") {
				navigation.navigate("Home", userData);
			} else {
				navigation.navigate("Rooms", userData);
			}
		} else {
			Alert.alert(alertData.title, alertData.message);
			setIsEmailInvalid(true);
			setIsPasswordInvalid(true);
			setIsLoading(false);
		}
	}

	return (
		<ScrollView>
			<View style={styles.container}>
				<Image style={styles.logo} source={logo} />

				<RegisterAnimation />

				<View style={styles.form}>
					<Text style={styles.formTitle}>Entrar</Text>

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

					<SubmitButton
						text={"Pronto!"}
						isLoading={isLoading}
						onPress={submit}
					/>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",

		height: height,

		backgroundColor: colors.green_bright,
	},

	logo: {
		width: width * 0.6,
		resizeMode: "contain",
	},

	form: {
		width: width,
		height: "55%",
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

	emailInput: {
		fontSize: 14,
		fontFamily: fonts.regular,

		padding: 12,
		width: "100%",
		marginBottom: 20,

		borderWidth: 1,
		borderRadius: 14,

		color: colors.green,
		backgroundColor: "transparent",
	},

	passwordContainer: {
		borderWidth: 1,
		borderRadius: 14,

		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",

		marginBottom: 20,
		paddingVertical: 10,
	},

	passwordInput: {
		fontSize: 14,
		fontFamily: fonts.regular,

		color: colors.green,
		backgroundColor: "transparent",

		width: "80%",
	},

	passwordIcon: {
		marginLeft: 12,
	},
});
