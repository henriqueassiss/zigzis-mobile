import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import fonts from "../styles/fonts";
import colors from "../styles/colors";
import Load from "../components/Load";
import ChartCard from "../components/ChartCard";
import { formatDate, dashBoard } from "../utils";
import { DashBoardProps } from "../utils/Interfaces";
import { getDeviceData, getDeviceDataByLocal } from "../services";
import { DefaultBarChart, DefaultLineChart } from "../components/Chart";

export default function DispenserDetails({ route }: any) {
	// Route Params
	const { macAddress, local } = route.params;

	// DashBoard States
	const [dashBoardData, setDashBoardData] =
		useState<DashBoardProps>(dashBoard);

	// General States
	const [isLoading, setIsLoading] = useState(true);

	// Cards Data
	const cardsData = [
		{
			title: "Total Utilizado",
			data: dashBoardData.allUsedCount,
		},
		{
			title: "Total Abastecido",
			data: dashBoardData.allStockedTimes,
		},
	];

	useEffect(() => {
		async function fetchDispenserData() {
			// const monthUsedTime = [
			// 	parseInt((Math.random() * 50).toFixed(0)),
			// 	parseInt((Math.random() * 50).toFixed(0)),
			// 	parseInt((Math.random() * 50).toFixed(0)),
			// 	parseInt((Math.random() * 50).toFixed(0)),
			// 	parseInt((Math.random() * 50).toFixed(0)),
			// 	parseInt((Math.random() * 50).toFixed(0)),
			// 	parseInt((Math.random() * 50).toFixed(0)),
			// 	parseInt((Math.random() * 50).toFixed(0)),
			// 	parseInt((Math.random() * 50).toFixed(0)),
			// 	0,
			// 	0,
			// 	0,
			// ];

			const monthUsedTime = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

			// const monthStockedTime = [
			// 	parseInt((Math.random() * 20).toFixed(0)),
			// 	parseInt((Math.random() * 20).toFixed(0)),
			// 	parseInt((Math.random() * 20).toFixed(0)),
			// 	parseInt((Math.random() * 20).toFixed(0)),
			// 	parseInt((Math.random() * 20).toFixed(0)),
			// 	parseInt((Math.random() * 20).toFixed(0)),
			// 	parseInt((Math.random() * 20).toFixed(0)),
			// 	parseInt((Math.random() * 20).toFixed(0)),
			// 	parseInt((Math.random() * 20).toFixed(0)),
			// 	0,
			// 	0,
			// 	0,
			// ];

			const monthStockedTime = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

			let allUsedCount = 0;
			let allStockedTimes = 0;

			let dispensersData;

			if (macAddress) {
				dispensersData = await getDeviceData(macAddress);
			} else {
				dispensersData = await getDeviceDataByLocal(local);
			}

			dispensersData.forEach((dispenserData) => {
				const { month } = formatDate(dispenserData.updatedTime);

				if (dispenserData.stocked) {
					monthStockedTime[month]++;
				} else {
					monthUsedTime[month]++;
				}
			});

			monthUsedTime.forEach((usedTimes) => (allUsedCount += usedTimes));

			monthStockedTime.forEach(
				(stockedTimes) => (allStockedTimes += stockedTimes)
			);

			setDashBoardData({
				allUsedCount: String(allUsedCount),
				allStockedTimes: String(allStockedTimes),
				allUsedCountByMonth: monthUsedTime,
				allStockedTimesByMonth: monthStockedTime,
			});
		}

		fetchDispenserData().then(() => setIsLoading(false));
	}, []);

	if (isLoading) return <Load width={"50%"} />;

	return (
		<View style={styles.container}>
			<View style={styles.cardList}>
				<FlatList
					numColumns={2}
					columnWrapperStyle={{ justifyContent: "space-between" }}
					keyExtractor={(item, index: number) => String(index)}
					data={cardsData}
					renderItem={({ item }) => {
						return (
							<ChartCard title={item.title} data={item.data} />
						);
					}}
				/>
			</View>

			<Text style={styles.chartTitle}>Total Utilizado x Mês</Text>

			<DefaultBarChart monthArray={dashBoardData.allUsedCountByMonth} />

			<Text style={styles.chartTitle}>Total Abastecido x Mês</Text>

			<DefaultLineChart
				monthArray={dashBoardData.allStockedTimesByMonth}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",

		padding: 32,
		backgroundColor: colors.green_extreme,
	},

	cardList: {
		margin: 12,
		width: "100%",
	},

	chartTitle: {
		fontSize: 16,
		paddingTop: 8,
		paddingHorizontal: 8,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		fontFamily: fonts.semiBold,
		color: colors.green_bright,
		backgroundColor: colors.green,
	},
});
