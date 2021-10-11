import React from 'react';
import {
	View,
	StyleSheet
} from 'react-native';

import colors from '../styles/colors';
import Header from '../components/Header';
import ButtonCard from '../components/ButtonCard';
import { UserProps } from '../utils/Interfaces';

export default function Home({ route, navigation } : any) {
	const user: UserProps = route.params;

	function HandleUserData(user: UserProps) {
		if (user.role === 'admin') {
			return (
				<>
					<ButtonCard
						title={'Criar novo usuário'}
						description={'Novos usuários para usarem o aplicativo'}
						onPress={() => navigation.navigate('Register')}
					/>
					<ButtonCard
						title={'Acessar o dashboard'}
						description={'Relatório sobre o uso dos dispensers'}
						onPress={() => navigation.navigate('Dispenser Details')}
					/>
					<ButtonCard
						title={'Acessar os dispensers'}
						description={'Salas dos dispensers'}
						onPress={() => navigation.navigate('Rooms')}
					/>
				</>
			);
		}

		return (
			<>
				<ButtonCard
					title={'Acessar o dashboard'}
					description={'Relatório sobre o uso dos dispensers'}
					onPress={() => navigation.navigate('Rooms')}
				/>
				<ButtonCard
					title={'Acessar os dispensers'}
					description={'Salas dos dispensers'}
					onPress={() => navigation.navigate('Rooms')}
				/>
			</>
		);
	}

	return (
		<View style={styles.container}>

			<Header {...user} />

			<HandleUserData {...user} />

		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',

		padding: 32,

		backgroundColor: colors.white,
	},

	roomsList: {
		width: '100%',
	},
});
