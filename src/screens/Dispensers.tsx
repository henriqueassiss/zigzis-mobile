import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
} from 'react-native';

import Load from '../components/Load';
import { getLocalDispensers } from '../services';
import { AllDispenserProps } from '../utils/Interfaces';
import { DispenserCard } from '../components/DispenserCard';

export default function Dispensers({ route } : any) {
	// Dispensers State
	const [ dispensers, setDispensers ] = useState<AllDispenserProps[]>([]);

	// General
	const local = route.params;
	const [ isLoading, setIsLoading ] = useState(false);

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

	if (isLoading) return <Load width={'50%'} />

  	return (
		<View style={styles.container}>

			<FlatList
				data={dispensers}
				keyExtractor={(item, index) => String(index)}
				renderItem={({item}) => {
					return (
						<DispenserCard
							local={item.local}
							fluidLevel={item.fluidLevel}
							used={item.used}
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
  }
});
