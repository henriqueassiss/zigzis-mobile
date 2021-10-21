import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";

import colors from "../styles/colors";
import Load from "../components/Load";
import { getLocalDispensers } from "../services";

import { DispenserProps } from "../utils/Interfaces";
import { DispenserCard } from "../components/DispenserCard";

export default function Dispensers({ route, navigation }: any) {
	// Dispensers State
	const [dispensers, setDispensers] = useState<DispenserProps[]>([]);

	// General
	const params = route.params;
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchDispensers() {
			setDispensers(await getLocalDispensers(params.local));
		}

		fetchDispensers().then(() => setIsLoading(false));
	}, []);

	if (isLoading) return <Load width={"50%"} />;

	return (
		<View style={styles.container}>
			<FlatList
				style={{ width: "100%" }}
				data={dispensers}
				keyExtractor={(item, index) => String(index)}
				renderItem={({ item }) => {
					return (
						<DispenserCard
							role={params.role}
							local={item.local}
							fluidLevel={item.fluidLevel}
							used={item.used}
							macAddress={item.macAddress}
							lastStockedTime={item.lastStockedTime}
							onPress={() =>
								navigation.navigate("Dispenser Details", {
									macAddress: item.macAddress,
								})
							}
						/>
					);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		paddingVertical: 42,
		alignItems: "center",
		paddingHorizontal: 20,
		backgroundColor: colors.green_extreme,
	},
});
