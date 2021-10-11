import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Login from '../screens/Login';
import Rooms from '../screens/Rooms';
import Register from '../screens/Register';
import Dispensers from '../screens/Dispensers';
import DispenserDetails from '../screens/DispenserDetails';

const Stack = createNativeStackNavigator();

export function Routes() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Login'>
				<Stack.Screen name='Login' component={Login}></Stack.Screen>
				<Stack.Screen name='Register' component={Register}></Stack.Screen>
				<Stack.Screen name='Home' component={Home}></Stack.Screen>
				<Stack.Screen name='Rooms' component={Rooms}></Stack.Screen>
				<Stack.Screen name='Dispensers' component={Dispensers}></Stack.Screen>
				<Stack.Screen name='Dispenser Details' component={DispenserDetails}></Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
