import React from 'react';
import {
	View,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import fonts from '../styles/fonts';
import colors from '../styles/colors';

interface Props extends TextInputProps {
	type?: 'default'|'password'
	isFocused: boolean,
	isInvalid: boolean,
	isPasswordHidden?: boolean,
	handlePasswordVisibility?: () => void,
	passwordInputIcon?: 'eye'|'eye-off',
}

export default function DefaultInput({
	type = 'default',
	isFocused,
	isInvalid,
	isPasswordHidden,
	handlePasswordVisibility,
	passwordInputIcon,
	...rest
} : Props) {

	if (type === 'password') {
		return (
			<View
				style={[
					styles.passwordContainer,
					isInvalid ? {borderColor: colors.red} : (isFocused ? {borderColor: colors.green} : {borderColor: colors.gray}),
				]}
			>

				<TextInput
					style={styles.passwordInput}
					placeholderTextColor={colors.gray}
					selectionColor={colors.green_bright}
					secureTextEntry={isPasswordHidden}
					{...rest}
				/>

				<TouchableOpacity
					activeOpacity={0.8}
					onPress={handlePasswordVisibility}
				>
					<Ionicons
						style={styles.passwordIcon}
						name={passwordInputIcon}
						size={28}
						color={colors.green}
					></Ionicons>
				</TouchableOpacity>


			</View>
		);
	}

	return (
		<TextInput
			style={[
				styles.defaultInput,
				isInvalid ? {borderColor: colors.red} : (isFocused ? {borderColor: colors.green} : {borderColor: colors.gray}),
			]}
			placeholderTextColor={colors.gray}
			selectionColor={colors.green_bright}
			{...rest}
		/>
	);
}

const styles = StyleSheet.create({
	defaultInput: {
		fontSize: 14,
		fontFamily: fonts.regular,

		padding: 12,
		width: '100%',
		marginBottom: 20,

		borderWidth: 1,
		borderRadius: 14,

		color: colors.green,
		backgroundColor: 'transparent',
	},

	passwordContainer: {
		borderWidth: 1,
		borderRadius: 14,

		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',

		marginBottom: 20,
		paddingVertical: 10,
	},

	passwordInput: {
		fontSize: 14,
		fontFamily: fonts.regular,

		color: colors.green,
		backgroundColor: 'transparent',

		width: '80%',
	},

	passwordIcon: {
		marginLeft: 12,
	},
});
