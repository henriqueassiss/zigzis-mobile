import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import colors from "../styles/colors";
import { DispenserReducedProps } from "../utils/Interfaces";

export function DispenserCard(dispenser: DispenserReducedProps) {
	const navigation = useNavigation();
	let fluidLevelColor;
	const fluidLevel = parseInt(dispenser.fluidLevel, 10);

	if (fluidLevel <= 100 && fluidLevel >= 67) {
		fluidLevelColor = "#33FF7E";
	} else if (fluidLevel <= 66 && fluidLevel >= 33) {
		fluidLevelColor = "#FFD726";
	} else if (fluidLevel <= 32 && fluidLevel >= 0) {
		fluidLevelColor = "#D21919";
	}

	return (
		<View style={styles.container}>
			<View style={styles.dataContainer}>
				<Text style={styles.local}>{dispenser.local}</Text>

				<View style={styles.dataWrapper}>
					<Text style={styles.dataText}>
						Qtd:{" "}
						<Text
							style={{
								fontWeight: "700",
								color: fluidLevelColor,
							}}
						>
							{dispenser.fluidLevel}%
						</Text>
					</Text>

					<Text style={styles.dataText}>
						Usado:{" "}
						<Text style={{ fontWeight: "700" }}>
							{dispenser.used} vezes
						</Text>
					</Text>

					<Text style={styles.dataText}>
						Reabastecido em:{" "}
						<Text style={{ fontWeight: "700" }}>
							{dispenser.lastStockedTime}
						</Text>
					</Text>
				</View>
			</View>

			<TouchableOpacity
				style={styles.dashBoardContainer}
				onPress={dispenser.onPress}
			>
				<Ionicons name="stats-chart" size={26} color={colors.white} />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	dataContainer: {
		width: "84%",
		padding: 12,
		borderRadius: 12,
		marginBottom: 10,

		backgroundColor: colors.green,
	},

	dataWrapper: {
		flexDirection: "column",
		justifyContent: "space-between",
	},

	local: {
		fontSize: 20,
		color: "#FFF",
		marginBottom: 5,
		fontWeight: "700",
	},

	dataText: {
		fontSize: 16,
		color: "#FFF",
		marginBottom: 5,
		fontWeight: "600",
	},

	dashBoardContainer: {
		padding: 12,
		borderRadius: 8,
		backgroundColor: colors.green,
	},
});
