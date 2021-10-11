import React from 'react';
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';

import colors from '../styles/colors';
import { DispenserProps } from '../utils/Interfaces';

export function DispenserCard(dispenser: DispenserProps) {
	let fluidLevelColor;

	if (dispenser.fluidLevel <= 100 && dispenser.fluidLevel >= 67) {
		fluidLevelColor = '#33FF7E';
	} else if (dispenser.fluidLevel <= 66 && dispenser.fluidLevel >= 33) {
		fluidLevelColor = '#FFD726';
	} else if (dispenser.fluidLevel <= 32 && dispenser.fluidLevel >= 0) {
		fluidLevelColor = '#D21919';
	}

	return (
		<View style={styles.container}>

			<Text style={styles.local}>
				{ dispenser.local }
			</Text>

			<View style={styles.dataWrapper}>

				<Text style={styles.dataText}>
					Qtd:{' '}
					<Text style={{fontWeight: '700', color: fluidLevelColor}}>
						{ dispenser.fluidLevel }%
					</Text>
				</Text>

				<Text style={styles.dataText}>
					Usado:{' '}
					<Text style={{fontWeight: '700'}}>
						{ dispenser.used } vezes
					</Text>
				</Text>

			</View>

		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 12,
		borderRadius: 12,
		marginBottom: 10,
		backgroundColor: colors.green
	},

	dataWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},

	local: {
		fontSize: 20,
		color: '#FFF',
		marginBottom: 5,
		fontWeight: '700',
	},

	dataText: {
		fontSize: 16,
		color: '#FFF',
		marginBottom: 5,
		fontWeight: '600',
	}
});
