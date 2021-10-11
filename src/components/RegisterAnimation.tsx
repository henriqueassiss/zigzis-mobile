import React from 'react';
import {
	View,
	Dimensions,
	StyleSheet
} from 'react-native';
import LottieView from 'lottie-react-native';

import animation from '../../assets/register_animation.json';

const { width, height } = Dimensions.get('window');

interface Props {
	margin?: number;
}

export default function RegisterAnimation({ margin = 0 } : Props) {
	return (
		<View style={styles.container}>
            <LottieView
				style={[
					styles.animation,
					margin !== 0 ? {marginTop: margin} : {}
				]}
                source={animation}
				autoPlay
				loop
            />
        </View>
	);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    animation: {
		width: width * 0.75,
        backgroundColor: 'transparent',
    }
})
