import React from "react";
import {
	Text,
	View,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { PieChart, LineChart, BarChart } from "react-native-chart-kit";

import { months } from "../utils";
import colors from "../styles/colors";
import { allDispenserDetailsProps } from "../utils/Interfaces";

const { width } = Dimensions.get("screen");
interface Props {
	monthArray: Array<number>;
}

export function DefaultBarChart({ monthArray }: Props) {
	return (
		<View style={styles.container}>
			<BarChart
				style={{
					borderRadius: 12,
					paddingRight: 30,
				}}
				data={{
					labels: months,
					datasets: [
						{
							data: monthArray,
						},
					],
				}}
				height={220}
				width={width - 64}
				yAxisLabel=""
				yAxisSuffix=""
				yLabelsOffset={4}
				xLabelsOffset={4}
				showBarTops={false}
				showValuesOnTopOfBars
				chartConfig={{
					decimalPlaces: 0,
					barPercentage: 0.4,
					fillShadowGradientOpacity: 1,
					labelColor: () => colors.white,
					backgroundGradientTo: colors.green,
					backgroundGradientFrom: colors.green,
					fillShadowGradient: colors.green_bright,
					color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
					propsForBackgroundLines: {
						stroke: `rgba(255, 255, 255, 0.25)`,
					},
				}}
			/>
		</View>
	);
}

export function DefaultLineChart({ monthArray }: Props) {
	return (
		<View style={styles.container}>
			<LineChart
				style={{
					borderRadius: 12,
					paddingRight: 36,
				}}
				data={{
					labels: months,
					datasets: [
						{
							data: monthArray,
						},
					],
				}}
				bezier
				height={220}
				width={width - 64}
				yAxisLabel=""
				renderDotContent={({ x, y, index, indexData }) => (
					<Text
						style={{
							top: y,
							left: x + 4,
							fontSize: 12,
							color: colors.black,
							position: "absolute",
						}}
					>
						{indexData.toFixed(0)}
					</Text>
				)}
				yAxisSuffix=""
				yLabelsOffset={10}
				xLabelsOffset={4}
				chartConfig={{
					decimalPlaces: 0,
					fillShadowGradientOpacity: 1,
					labelColor: () => colors.white,
					backgroundGradientTo: colors.green,
					backgroundGradientFrom: colors.green,
					fillShadowGradient: colors.green_bright,
					color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
				}}
			/>
		</View>
	);
}

interface DefaultPieChartProps {
	data: allDispenserDetailsProps[];
	accessor: "allUsedCount" | "allStockedTimes";
	onPress: () => void;
}

export function DefaultPieChart({
	data,
	accessor,
	onPress,
}: DefaultPieChartProps) {
	return (
		<TouchableOpacity activeOpacity={0.8} onPress={onPress}>
			<PieChart
				style={{
					borderRadius: 12,
				}}
				data={data}
				absolute
				avoidFalseZero
				paddingLeft="2"
				accessor={accessor}
				backgroundColor={"transparent"}
				height={220}
				width={width - 64}
				chartConfig={{
					decimalPlaces: 0,
					barPercentage: 0.4,
					fillShadowGradientOpacity: 1,
					labelColor: () => colors.white,
					backgroundGradientTo: colors.green,
					backgroundGradientFrom: colors.green,
					fillShadowGradient: colors.green_bright,
					color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
					propsForBackgroundLines: {
						stroke: `rgba(255, 255, 255, 0.25)`,
					},
				}}
			/>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		marginBottom: 12,
	},
});
