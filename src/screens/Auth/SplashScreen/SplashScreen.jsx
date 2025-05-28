import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { Image, useWindowDimensions, View } from 'react-native'
// import Logo from '../assests/landing.svg';
import { useDispatch, useSelector } from 'react-redux';
import { loadToken } from '../../../redux/slices/authSlice';
const SplashScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const screen = useWindowDimensions();
    const { userToken, loading } = useSelector((state) => state.auth);
    useEffect(() => {
        dispatch(loadToken());
    }, []);
    // useEffect(() => {
    //      setTimeout(() => {
    //         navigation.replace('WelcomeScreen');
    //         // navigation.replace('AdminPanel');
    //     }, 2000);
  
    // }, [])
    useEffect(() => {
        // if (loading) return;
        let timer;
        if (userToken) {
            timer = setTimeout(() => {
                navigation.replace('MainTabs');
            }, 1000);

        } else {
            timer = setTimeout(() => {
                navigation.replace('WelcomeScreen');
            }, 1000);

        }
        if (timer) {
            return () => clearTimeout(timer);
        }

    }, [userToken, loading]);

    console.log('Token:', userToken, 'Loading:', loading);

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
