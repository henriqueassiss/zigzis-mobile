import React from "react";
import {
	Text,
	StyleSheet,
	TouchableOpacity,
	TouchableOpacityProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import fonts from "../styles/fonts";
import colors from "../styles/colors";

interface Props extends TouchableOpacityProps {
	title: string;
	description: string;
	icon: "person" | "information-circle" | "stats-chart";
}

export default function ButtonCard({
	title,
	description,
	icon,
	...rest
}: Props) {
	return (
		<TouchableOpacity style={styles.card} activeOpacity={0.8} {...rest}>
			<Ionicons
				style={styles.cardIcon}
				name={icon}
				size={20}
				color={colors.white}
			/>

			<Text style={styles.cardDispensers}>{description}</Text>

			<Text style={styles.cardTitle}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		height: 110,
		width: "100%",
		marginBottom: 13,
		paddingVertical: 12,
		paddingHorizontal: 12,

		alignItems: "flex-start",
		justifyContent: "flex-end",

		borderRadius: 12,
		backgroundColor: colors.green,
	},
	cardIcon: {
		top: 10,
		right: 10,
		position: "absolute",
	},

	cardTitle: {
		fontSize: 18,
		fontFamily: fonts.semiBold,
		color: colors.white,
	},

	cardDispensers: {
		fontSize: 12,
		fontFamily: fonts.semiBold,
		color: colors.green_bright,
	},
});
