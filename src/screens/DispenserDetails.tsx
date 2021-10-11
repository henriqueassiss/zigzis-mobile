import React from 'react';
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';
import BezierChart from '../components/BezierChart';

export default function DispenserDetails({ route } : any) {
	return (
		<View style={styles.container}>
			<BezierChart />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',

		padding: 32,
	},
});
