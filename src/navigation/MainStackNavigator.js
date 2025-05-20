import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator/TabNavigator';
import ReferralDetailsScreen from '../screens/Referral/ReferralScreen/ReferralDetailsScreen';
import PersonalDetails from '../screens/Profile/PersonalDetailsScreen/PersonalDetails.';
import WalletInfoScreen from '../screens/Profile/WalletScreen/WalletInfoScreen';
import TransactionHistoryScreen from '../screens/Transactions/TransactionHistoryScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';

import WelcomeScreen from '../screens/Auth/WelcomeScreen/WelcomeScreen';
import SplashScreen from '../screens/Auth/SplashScreen/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator/AuthNavigator';
import LoginScreen from '../screens/Auth/LoginScreen/LoginScreen';
import SignUpScreen from '../screens/Auth/OTPVerificationScreen/SignUpScreen';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='SplashScreen' component={SplashScreen} />
        <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
        {/* <Stack.Screen name='AuthStack' component={AuthNavigator} /> */}
        <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='SignUpScreen' component={SignUpScreen} />

        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="ReferralDetails" component={ReferralDetailsScreen} />
        <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
        <Stack.Screen name="WalletInfo" component={WalletInfoScreen} />
        <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
