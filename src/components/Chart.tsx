import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import {
	LineChart,
	BarChart,
	PieChart,
	ProgressChart,
	ContributionGraph,
	StackedBarChart,
} from "react-native-chart-kit";

import { getDeviceData } from "../services";
import { DeviceData } from "../utils/Interfaces";

interface Props {
	macAddress: string;
}

export default function Chart({ macAddress }: Props) {
	const [dispensersData, setDispensersData] = useState<DeviceData[]>([]);

	useEffect(() => {
		async function fetchDispensersData() {
			setDispensersData(await getDeviceData(macAddress));
		}

		function handleDispensersData() {
			dispensersData.forEach((dispenserData) => {
				let date = Date.parse(dispenserData.updatedTime);
				console.log(dispenserData.updatedTime);
			});
		}

		fetchDispensersData();
		// handleDispensersData();
	}, []);

	return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
	},
});
