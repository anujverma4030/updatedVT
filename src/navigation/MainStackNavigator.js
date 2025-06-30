import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator/TabNavigator';
import ReferralDetailsScreen from '../screens/Referral/ReferralScreen/ReferralDetailsScreen';
import PersonalDetails from '../screens/Profile/PersonalDetailsScreen/PersonalDetails';
import WalletInfoScreen from '../screens/Profile/WalletScreen/WalletInfoScreen';
import TransactionHistoryScreen from '../screens/Transactions/TransactionHistoryScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import WelcomeScreen from '../screens/Auth/WelcomeScreen/WelcomeScreen';
import SplashScreen from '../screens/Auth/SplashScreen/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/Auth/LoginScreen/LoginScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen/SignUpScreen';
import AdminStackNavigator from './AdminStackNavigator';
import AuthNavigator from './AuthNavigator/AuthNavigator';
import UserDeposit from '../screens/Deposit/UserDeposit';
import UserWithdraw from '../screens/Withdraw/UserWithdraw';
import UserWithdrawOTP from '../screens/Withdraw/UserWithdrawOTP';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux';
import { loadToken, loadUserFromStorage } from '../redux/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { getEmployeeById } from '../redux/slices/userSlice';
import ScreenWrapper from '../components/ScreenWrapper';


const Stack = createNativeStackNavigator();
const MainStackNavigator = () => {
  const dispatch = useDispatch();
  // const { userToken, loading } = useSelector((state) => state.auth);
  // console.log('User Token in MainStack:', userToken, 'Loading:', loading);
  // useEffect(() => {
  //   dispatch(loadToken());
  // }, []);


  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <ScreenWrapper>
          <Stack.Navigator screenOptions={{
            headerShown: false,
            animation: 'fade_from_bottom',
            orientation:'portrait'

          }}
           initialRouteName='AdminPanel'
          >
            
            <Stack.Screen name='SplashScreen' component={SplashScreen} />
            <Stack.Screen name='AdminPanel' component={AdminStackNavigator} />
            <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
            <Stack.Screen name='AuthStack' component={AuthNavigator} />
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            <Stack.Screen name="ReferralDetails" component={ReferralDetailsScreen} />
            <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
            <Stack.Screen name="WalletInfo" component={WalletInfoScreen} />
            <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name='UserDeposit' component={UserDeposit} />
            <Stack.Screen name='UserWithdraw' component={UserWithdraw} />
            <Stack.Screen name='UserWithdrawalOTP' component={UserWithdrawOTP} />

          </Stack.Navigator>
        </ScreenWrapper>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
