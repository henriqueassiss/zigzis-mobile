import React from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native';

import fonts from '../styles/fonts';
import colors from '../styles/colors';
import { UserProps } from '../utils/Interfaces';

export default function Header(user: UserProps) {
	return (
		<View style={styles.container}>

			<Text style={styles.greeting}>
				Olá,
			</Text>

			<Text style={styles.name}>
				{ user.name }
			</Text>

		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		marginBottom: 20,
	},

	greeting: {
		fontSize: 18,
		fontFamily: fonts.semiBold,
		color: colors.black,
	},

	name: {
		fontSize: 28,
		fontFamily: fonts.bold,
		color: colors.black,
	},
});
