import React from 'react';
import {
	Text,
	View,
	Dimensions,
	StyleSheet,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const { width, height } = Dimensions.get('window');

export default function BezierChart() {
	return (
		<LineChart
			style={{borderRadius: 12}}
			data={{
				labels: ["January", "February", "March", "April", "May", "June"],
				datasets: [
				  {
					data: [
					  Math.random() * 100,
					  Math.random() * 100,
					  Math.random() * 100,
					  Math.random() * 100,
					  Math.random() * 100,
					  Math.random() * 100
					]
				  }
				]
			  }}
			width={375}
			height={256}
			verticalLabelRotation={30}
			chartConfig={{
				backgroundColor: "#e26a00",
				backgroundGradientFrom: "#fb8c00",
				backgroundGradientTo: "#ffa726",
				decimalPlaces: 2, // optional, defaults to 2dp
				color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
				labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
				propsForDots: {
				  r: "4",
				  strokeWidth: "2",
				  stroke: "#ffa726"
				}
			  }}
			bezier
		/>
	);
}
