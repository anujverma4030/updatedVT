import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { Image, useWindowDimensions, View } from 'react-native'
// import Logo from '../assests/landing.svg';

const SplashScreen = () => {
    const navigation = useNavigation();
    const screen = useWindowDimensions();
    useEffect(() => {

        const timer = setTimeout(() => {
            navigation.replace('WelcomeScreen');
        }, 2000);


    }, []) 
    return (
        <View>
            {/* <Logo width={100} height={100} /> */}
            <Image
                style={{
                    width: "100%",
                    height: screen.height,
                }}
                source={require('../../../assests/landing.png')}
                resizeMode='cover'
            />
        </View>
    )
}

export default SplashScreen;
