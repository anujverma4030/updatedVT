// import { useNavigation } from '@react-navigation/native';
// import React, { useEffect } from 'react'
// import { Image, ImageBackground, Platform, StatusBar, useWindowDimensions, View } from 'react-native'
// // import Logo from '../assests/landing.svg';
// import { useDispatch, useSelector } from 'react-redux';
// import { loadToken } from '../../../redux/slices/authSlice';
// import jwtDecode from 'jwt-decode';
// import { getEmployeeById } from '../../../redux/slices/userSlice';
// import { decodeUserFromToken } from '../../../utils/auth';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Loader from '../../../components/Loader/Loader';

// const SplashScreen = () => {
//     const dispatch = useDispatch();
//     const navigation = useNavigation();
//     const screen = useWindowDimensions();
//     const { userToken, loading } = useSelector((state) => state.auth);
//     const { userDetails, errorMsg } = useSelector((state) => state.user);
//     const { height, width } = useWindowDimensions();
//     const adjustedHeight = Platform.OS === 'android' ? height + StatusBar.currentHeight : height;
//     // console.log('User Token in splash:', userToken, 'Loading:', loading); 
//     // console.log('User Details:', userDetails);
//     // useEffect(() => {
//     //     // if (loading) return;
//     //     let timer;
//     //     if (userToken) {
//     //         timer = setTimeout(() => {
//     //             navigation.replace('MainTabs');
//     //         }, 1000);

//     //     } else {
//     //         timer = setTimeout(() => {
//     //             navigation.replace('WelcomeScreen');
//     //         }, 1000);

//     //     }
//     //     if (timer) {
//     //         return () => clearTimeout(timer);
//     //     }

//     // }, [userToken, loading]);
//     useEffect(() => {
//         if (!userToken) return; // Only run if token exists

//         const decoded = decodeUserFromToken(userToken);
//         if (decoded?.id) {
//             dispatch(getEmployeeById(decoded.id));
//         }
//     }, [userToken]);

//     useEffect(() => {
//         if (!userToken) {
//             setTimeout(() => {
//                 navigation.replace('WelcomeScreen');
//             }, 2000);
//             return;
//         }

//         if (!userDetails) return;

//         const role = userDetails?.role?.toLowerCase();
//         // console.log('User Role:', role);

//         const timer = setTimeout(() => {
//             if (role === 'user') {
//                 navigation.replace('MainTabs');
//             } else if (role === 'admin') {
//                 navigation.replace('AdminPanel');
//             } else {
//                 navigation.replace('WelcomeScreen');
//             }
//         }, 2000);

//         return () => clearTimeout(timer);
//     }, [userToken, userDetails]);


//     return (
//         <View>
//             {/* <Logo width={100} height={100} /> */}
//             {/* <Image
//                 style={{
//                     width: "100%",
//                     height: screen.height,
//                 }}
//                 source={require('../../../assests/landing.png')}
//                 resizeMode='cover'
//             /> */}
//             <ImageBackground
//                 source={require('../../../assests/landing.png')}
//                 style={{
//                     width: "100%",
//                     height: adjustedHeight,
//                     flex: 1
//                 }}
//                 resizeMode='cover'
//             >
//                 <SafeAreaView>
//                     <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
//                 </SafeAreaView>
//             </ImageBackground>
//         </View>
//     )
// }

// export default SplashScreen;
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ImageBackground, Platform, StatusBar, useWindowDimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeById } from '../../../redux/slices/userSlice';
import { decodeUserFromToken } from '../../../utils/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loader from '../../../components/Loader/Loader';
import { Text } from 'react-native-gesture-handler';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

const SplashScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { height } = useWindowDimensions();
    const adjustedHeight = Platform.OS === 'android' ? height + StatusBar.currentHeight : height;

    const { userToken, loading } = useSelector((state) => state.auth);
    const { userDetails } = useSelector((state) => state.user);
    // console.log('User Details:', userDetails);
    console.log('User Token in splash:', userToken, 'Loading:', loading);

    //  Fetch userDetails if token is available
    useEffect(() => {
        if (!loading && userToken) {
            const decoded = decodeUserFromToken(userToken);
            if (decoded?.id) {
                dispatch(getEmployeeById(decoded.id));
            }
        }
    }, [userToken, loading]);

    //  Decide where to navigate once token & userDetails are ready
    useEffect(() => {
        if (loading) return;

        // Token is not available, go to welcome
        if (!userToken) {
            const timer = setTimeout(() => {
                navigation.replace('WelcomeScreen');
            }, 1500);
            return () => clearTimeout(timer);
        }

        // Wait until userDetails are fetched
        if (!userDetails) return;

        const role = userDetails?.role?.toLowerCase();
        const timer = setTimeout(() => {
            if (role === 'user') {
                navigation.replace('MainTabs');
            } else if (role === 'admin') {
                navigation.replace('AdminPanel');
            } else {
                navigation.replace('WelcomeScreen');
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, [loading, userToken, userDetails]);

    //  Show loader while auth or user data is loading
    if (loading || (userToken && !userDetails)) {
        // return <Loader />;
    }
    useEffect(() => {
        changeNavigationBarColor('transparent', true); // true = light nav icons
    }, []);
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent hidden={true}/>

            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../../../assests/landing.png')}
                    style={{ width: '100%', height: adjustedHeight, flex: 1 }}
                    resizeMode='cover'
                >
                </ImageBackground>
            </View>
        </>
    );
};

export default SplashScreen;

