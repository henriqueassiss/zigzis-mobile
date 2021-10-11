import React from 'react';
import {
	Text,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';

import Load from './Load';
import fonts from '../styles/fonts';
import colors from '../styles/colors';

interface Props {
	text: string,
	isLoading: boolean,
	onPress: () => void,
}

export default function SubmitButton({ text, isLoading, onPress } : Props) {
	return (
		<TouchableOpacity
			style={styles.container}
			activeOpacity={0.8}
			onPress={onPress}
		>
			{ isLoading ?
				<Load width={'30%'} type={'white'} /> :
				<Text style={styles.text}>
					{ text }
				</Text>
			}

		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 50,
		borderRadius: 14,
		paddingVertical: 15,
		backgroundColor: colors.green,
	},

	text: {
		fontSize: 16,
		textAlign: 'center',
		fontFamily: fonts.regular,
		color: colors.white,
	}
});
