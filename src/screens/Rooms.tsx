import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";

import { localInfo } from "../utils";
import Load from "../components/Load";
import colors from "../styles/colors";
import Header from "../components/Header";
import RoomCard from "../components/RoomCard";
import ButtonCard from "../components/ButtonCard";
import { getAllDispensers } from "../services";
import { UserProps, RoomListProps, DispenserProps } from "../utils/Interfaces";

export default function Rooms({ route, navigation }: any) {
	// Rooms State
	const [roomsList, setRoomsList] = useState<RoomListProps[]>([]);

	// General
	const user: UserProps = route.params;
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function fetchDispensers() {
			const dispensersDataFromAPI: DispenserProps[] =
				await getAllDispensers();

			let roomsData: RoomListProps[] = [];

			localInfo.forEach((data) => {
				const obj = {
					local: data.local,
					dispensers: 0,
					onPress: () =>
						navigation.navigate("Dispensers", {
							local: data.local,
							role: user.role,
						}),
				};

				roomsData.push(obj);
			});

			dispensersDataFromAPI.forEach((dispenser) => {
				localInfo.forEach((data) => {
					if (dispenser.local.includes(data.local)) {
						const index = roomsData.findIndex((info) => {
							return info.local === data.local;
						});

						roomsData[index].dispensers++;
					}
				});
			});

			setRoomsList(roomsData);
		}

		fetchDispensers().then(() => setIsLoading(false));
	}, []);

	function HandleUserData(user: UserProps) {
		if (user.role !== "admin") {
			return <Header {...user} />;
		}

		return <></>;
	}

	function HandleGeneralDashboard(user: UserProps) {
		if (user.role !== "viewer") {
			return (
				<>
					<ButtonCard
						icon={"stats-chart"}
						title={"Acessar o dashboard geral"}
						description={"Exibe os dados de todos os dispensers"}
						onPress={() =>
							navigation.navigate("All Dispenser Details")
						}
					/>
				</>
			);
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

			<HandleGeneralDashboard {...user} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",

		paddingVertical: 42,
		paddingHorizontal: 20,

		backgroundColor: colors.green_extreme,
	},

	roomsList: {
		width: "100%",
	},
});
