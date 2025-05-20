import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator/TabNavigator';
import ReferralDetailsScreen from '../screens/Referral/ReferralScreen/ReferralDetailsScreen';
import PersonalDetails from '../screens/Profile/PersonalDetailsScreen/PersonalDetails.';
import WalletInfoScreen from '../screens/Profile/WalletScreen/WalletInfoScreen';
import TransactionHistoryScreen from '../screens/Transactions/TransactionHistoryScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="ReferralDetails" component={ReferralDetailsScreen} />
      <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
      <Stack.Screen name="WalletInfo" component={WalletInfoScreen} />
      <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
