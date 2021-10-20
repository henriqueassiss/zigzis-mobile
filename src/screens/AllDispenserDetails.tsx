import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import fonts from "../styles/fonts";
import colors from "../styles/colors";
import Load from "../components/Load";
import Popup from "../components/Popup";
import { getDeviceData } from "../services";
import { DefaultPieChart } from "../components/Chart";
import { allDispenserDetailsProps } from "../utils/Interfaces";
import { allDispenserDetailsDashboard, localInfo } from "../utils";

export default function AllDispenserDetails({ navigation }: any) {
	// DashBoard States
	const [allDispenserDetails, setAllDispenserDetails] = useState<
		allDispenserDetailsProps[]
	>([allDispenserDetailsDashboard]);

	// General States
	const [isLoading, setIsLoading] = useState(true);
	const [isPopupVisible, setIsPopupVisible] = useState(false);

	function handleIsPopupVisible() {
		setIsPopupVisible(!isPopupVisible);
	}

	function navigateToDispenserDashboard(local: string) {
		handleIsPopupVisible();
		navigation.navigate("Dispenser Details", { local: local });
	}

	useEffect(() => {
		async function fetchDispenserData() {
			let dispenserDetailsByLocal: allDispenserDetailsProps[] = [];

			localInfo.forEach((data) => {
				const obj = {
					name: data.local,
					allUsedCount: 0,
					allStockedTimes: 0,
					color: data.color,
					legendFontSize: 15,
					legendFontColor: colors.gray_dark,
				};

				dispenserDetailsByLocal.push(obj);
			});

			const dispensersData = await getDeviceData();

			dispensersData.forEach((dispenserData) => {
				localInfo.forEach((data) => {
					if (dispenserData.local.includes(data.local)) {
						const index = dispenserDetailsByLocal.findIndex(
							(dispenserDetail) => {
								return dispenserDetail.name === data.local;
							}
						);
						if (dispenserData.stocked) {
							dispenserDetailsByLocal[index].allStockedTimes++;
						} else {
							dispenserDetailsByLocal[index].allUsedCount++;
						}
					}
				});
			});

			setAllDispenserDetails(dispenserDetailsByLocal);
		}

		fetchDispenserData().then(() => setIsLoading(false));
	}, []);

	if (isLoading) return <Load width={"50%"} />;

	return (
		<View style={styles.container}>
			<Popup
				isPopupVisible={isPopupVisible}
				onCancel={handleIsPopupVisible}
				onSelectItem={navigateToDispenserDashboard}
			/>

			<Text style={styles.chartTitle}>Total Utilizado x Local</Text>

			<DefaultPieChart
				data={allDispenserDetails}
				accessor={"allUsedCount"}
				onPress={handleIsPopupVisible}
			/>

			<Text style={styles.chartTitle}>Total Abastecido x Local</Text>

			<DefaultPieChart
				data={allDispenserDetails}
				accessor={"allStockedTimes"}
				onPress={handleIsPopupVisible}
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
		color: colors.green,
	},
});
