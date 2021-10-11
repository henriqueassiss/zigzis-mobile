import React from 'react';
import {
	View,
	StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import fonts from '../styles/fonts';
import colors from '../styles/colors';

interface Props {
	oldRole: 'admin'|'analist'|'viewer',
	onChange: (selectedRole: 'admin'|'analist'|'viewer') => void,
}

export default function RolePicker({ oldRole, onChange } : Props) {
	return (
		<View style={styles.container}>
			<Picker
				style={styles.picker}
				itemStyle={styles.item}
				mode={'dropdown'}
				dropdownIconColor={colors.green}
				selectedValue={oldRole}
				onValueChange={selectedRole => onChange(selectedRole)}
			>
				<Picker.Item
					style={styles.item}
					label='Administrador'
					value='admin'
				/>
				<Picker.Item
					style={styles.item}
					label='Analista'
					value='analist'
				/>
				<Picker.Item
					style={styles.item}
					label='Operador'
					value='viewer'
				/>
			</Picker>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 20,
		paddingVertical: 16,
		paddingHorizontal: 6,
		width: '100%',

		borderWidth: 1,
		borderRadius: 14,
		borderColor: colors.green,
	},

	picker: {
		color: colors.green,
	},

	item: {
		fontSize: 14,
		fontFamily: fonts.regular,
		color: colors.green,
	},
});
