import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/Auth/LoginScreen/LoginScreen';
import SignUpScreen from '../../screens/Auth/OTPVerificationScreen/SignUpScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator 
        screenOptions={{
            headerShown:false,
            animation: 'fade_from_bottom'
        }}
        >
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='SignUpScreen' component={SignUpScreen} />

        </Stack.Navigator>

    )
}

export default AuthNavigator

const styles = StyleSheet.create({})