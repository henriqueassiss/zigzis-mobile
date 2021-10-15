import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface Props {
	title: string;
	data: string | undefined;
}

export default function ChartCard({ title, data }: Props) {
	return (
		<View style={styles.cardContainer}>
			<Text style={styles.cardTitle}>{title}</Text>
			<Text style={styles.cardData}>{data}</Text>
			<Ionicons
				style={styles.cardIcon}
				name={"stats-chart"}
				size={20}
				color={colors.white}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	cardContainer: {
		width: "48%",
		height: 85,
		padding: 12,
		borderRadius: 12,
		backgroundColor: colors.green,
		justifyContent: "space-between",
	},

	cardIcon: {
		top: 10,
		right: 10,
		position: "absolute",
	},

	cardTitle: {
		fontSize: 16,
		color: colors.green_bright,
		fontFamily: fonts.semiBold,
	},

	cardData: {
		fontSize: 26,
		color: colors.white,
		fontFamily: fonts.bold,
	},
});
