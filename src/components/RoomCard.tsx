import React from 'react';
import {
	Text,
	StyleSheet,
	TouchableOpacity,
	TouchableOpacityProps,
} from 'react-native';

import fonts from '../styles/fonts';
import colors from '../styles/colors';

interface Props extends TouchableOpacityProps {
	local: string;
	dispensers: number;
}

export default function RoomCard({ local, dispensers, ...rest } : Props) {
	return (
		<TouchableOpacity
			style={styles.card}
			activeOpacity={0.8}
			{...rest}
		>

			<Text style={styles.cardDispensers}>
				{ dispensers } Dispensers
			</Text>

			<Text style={styles.cardTitle}>
				{ local }
			</Text>

		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		height: 110,
		width: '48%',
		marginBottom: 13,
		paddingVertical: 12,
		paddingHorizontal: 12,

		alignItems: 'flex-start',
		justifyContent: 'flex-end',

		borderRadius: 12,
		backgroundColor: colors.green
	},

	cardTitle: {
		fontSize: 18,
		fontFamily: fonts.semiBold,
		color: colors.white,
	},

	cardDispensers: {
		fontSize: 12,
		fontFamily: fonts.semiBold,
		color: colors.green_bright,
	},
});
