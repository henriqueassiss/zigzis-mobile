import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

interface Props {
	width: string;
	type?: "white" | "green";
}

export default function Load({ width, type = "green" }: Props) {
	const directory = {
		green: require("../../assets/load_green.json"),
		white: require("../../assets/load_white.json"),
	};

	return (
		<View style={styles.container}>
			<LottieView
				style={[styles.animation, { width: width }]}
				source={directory[type]}
				autoPlay
				loop
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},

	animation: {
		backgroundColor: "transparent",
	},
});
