import React from "react";
import { View, StyleSheet } from "react-native";

import colors from "../styles/colors";
import Header from "../components/Header";
import { UserProps } from "../utils/Interfaces";
import ButtonCard from "../components/ButtonCard";

export default function Home({ route, navigation }: any) {
	const user: UserProps = route.params;

	function HandleUserData() {
		return (
			<>
				<ButtonCard
					icon={"person"}
					title={"Criar novo usuário"}
					description={"Novos usuários para usarem o aplicativo"}
					onPress={() => navigation.navigate("Register")}
				/>
				<ButtonCard
					icon={"information-circle"}
					title={"Detalhes dos dispensers"}
					description={"Salas dos dispensers"}
					onPress={() => navigation.navigate("Rooms", user)}
				/>
			</>
		);
	}

	return (
		<View style={styles.container}>
			<Header {...user} />

			<HandleUserData />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",

		padding: 32,

		backgroundColor: colors.green_extreme,
	},

	roomsList: {
		width: "100%",
	},
});
