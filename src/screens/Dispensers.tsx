import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";

import Load from "../components/Load";
import { getLocalDispensers } from "../services";
import { DispenserProps } from "../utils/Interfaces";
import { DispenserCard } from "../components/DispenserCard";

export default function Dispensers({ route, navigation }: any) {
	// Dispensers State
	const [dispensers, setDispensers] = useState<DispenserProps[]>([]);

	// General
	const local = route.params;
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchDispensers() {
			if (dispensers === []) {
				setIsLoading(true);
			} else {
				setIsLoading(false);
			}
			setDispensers(await getLocalDispensers(local));
		}

		fetchDispensers();
	}, []);

	if (isLoading) return <Load width={"50%"} />;

	return (
		<View style={styles.container}>
			<FlatList
				data={dispensers}
				keyExtractor={(item, index) => String(index)}
				renderItem={({ item }) => {
					return (
						<DispenserCard
							local={item.local}
							fluidLevel={item.fluidLevel}
							used={item.used}
							macAddress={item.macAddress}
							lastStockedTime={item.lastStockedTime}
							onPress={() =>
								navigation.navigate(
									"Dispenser Details",
									item.macAddress
								)
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
		padding: 32,
	},
});
