import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import Chart from "../components/Chart";
import ChartCard from "../components/ChartCard";
import Load from "../components/Load";
import { getDispenserByMacAddress, getDeviceData } from "../services";

export default function DispenserDetails({ route }: any) {
	const macAddress = route.params;
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState({ allUsedCount: "", allStockedTimes: "" });

	useEffect(() => {
		async function fetchDispenserData() {
			const dispenser = await getDispenserByMacAddress(macAddress);
			const deviceData = await getDeviceData(macAddress);
			let stockedTimes = 0;

			deviceData.forEach((data) => {
				if (data.stocked) {
					stockedTimes++;
				}
			});

			setData({
				allUsedCount: dispenser.allUsedCount,
				allStockedTimes: String(stockedTimes),
			});
		}

		fetchDispenserData().then(() => setIsLoading(false));
	}, []);

	if (isLoading) return <Load width={"50%"} />;

	return (
		<View style={styles.container}>
			<Chart macAddress={macAddress} />

			<FlatList
				style={styles.cardList}
				numColumns={2}
				columnWrapperStyle={{ justifyContent: "space-between" }}
				keyExtractor={(item, index) => String(index)}
				data={[
					{
						title: "Usado",
						data: data.allUsedCount,
					},
					{ title: "Reabastecido", data: data.allStockedTimes },
				]}
				renderItem={({ item }) => {
					return <ChartCard title={item.title} data={item.data} />;
				}}
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
	},

	cardList: {
		width: "100%",
	},
});
