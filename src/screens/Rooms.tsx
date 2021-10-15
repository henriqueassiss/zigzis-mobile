import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";

import colors from "../styles/colors";
import Load from "../components/Load";
import Header from "../components/Header";
import RoomCard from "../components/RoomCard";
import { getAllDispensers } from "../services";
import { UserProps, RoomListProps, DispenserProps } from "../utils/Interfaces";

export default function Rooms({ route, navigation }: any) {
	// Rooms State
	const [roomsList, setRoomsList] = useState<RoomListProps[]>([]);

	// General
	const user: UserProps = route.params;
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchDispensers() {
			setIsLoading(true);
			const dispensersDataFromAPI: DispenserProps[] =
				await getAllDispensers();

			let roomDispensers: number = 0;
			let bathroomDispensers: number = 0;
			let corridorDispensers: number = 0;
			let elevatorDispensers: number = 0;

			dispensersDataFromAPI.forEach((dispenser) => {
				if (dispenser.local.includes("Sala")) {
					roomDispensers++;
				} else if (dispenser.local.includes("Banheiro")) {
					bathroomDispensers++;
				} else if (dispenser.local.includes("Corredor")) {
					corridorDispensers++;
				} else if (dispenser.local.includes("Elevador")) {
					elevatorDispensers++;
				}
			});

			const roomsData: RoomListProps[] = [
				{
					local: "Sala",
					dispensers: roomDispensers,
					onPress: () => navigation.navigate("Dispensers", "sala"),
				},
				{
					local: "Banheiro",
					dispensers: bathroomDispensers,
					onPress: () =>
						navigation.navigate("Dispensers", "banheiro"),
				},
				{
					local: "Corredor",
					dispensers: corridorDispensers,
					onPress: () =>
						navigation.navigate("Dispensers", "corredor"),
				},
				{
					local: "Elevador",
					dispensers: elevatorDispensers,
					onPress: () =>
						navigation.navigate("Dispensers", "elevador"),
				},
			];

			setRoomsList(roomsData);
			setIsLoading(false);
		}

		fetchDispensers();
	}, []);

	function HandleUserData(user: UserProps) {
		if (user.role === "viewer") {
			return <Header {...user} />;
		}

		return <></>;
	}

	if (isLoading) return <Load width={"50%"} />;

	return (
		<View style={styles.container}>
			<HandleUserData {...user} />

			<FlatList
				style={styles.roomsList}
				columnWrapperStyle={{ justifyContent: "space-between" }}
				numColumns={2}
				data={roomsList}
				keyExtractor={(item, index) => String(index)}
				renderItem={({ item }) => {
					return (
						<RoomCard
							local={item.local}
							dispensers={item.dispensers}
							onPress={item.onPress}
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
		alignItems: "center",
		justifyContent: "flex-start",

		padding: 32,

		backgroundColor: colors.white,
	},

	roomsList: {
		width: "100%",
	},
});
