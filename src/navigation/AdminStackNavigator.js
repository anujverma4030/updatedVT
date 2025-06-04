import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashBoardScreen from '../screens/adminTemplateScreens/DashBoardScreen';
import UsersScreen from '../screens/adminTemplateScreens/UsersScreen';

import SpinLogsScreen from '../screens/adminTemplateScreens/SpinLogsScreen';
import DepositsScreen from '../screens/adminTemplateScreens/DepositsScreen';
import WithdrawalsScreen from '../screens/adminTemplateScreens/WithdrawalsScreen';
import AdminSettingsScreen from '../screens/adminTemplateScreens/AdminSettingsScreen';
import InvestmentsScreen from '../screens/adminTemplateScreens/InvestmentsScreen';
import ApproveWithdrawal from '../screens/adminTemplateScreens/ApproveWithdrawal';


const Stack = createNativeStackNavigator();

const AdminStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            animation: 'fade_from_bottom'
        }}>
            <Stack.Screen name="Home" component={DashBoardScreen} />
            <Stack.Screen name="Users" component={UsersScreen} />
            <Stack.Screen name="Investments" component={InvestmentsScreen} />
            <Stack.Screen name="SpinLogs" component={SpinLogsScreen} />
            <Stack.Screen name="Deposits" component={DepositsScreen} />
            <Stack.Screen name="Withdrawals" component={WithdrawalsScreen} />
            <Stack.Screen name="Settings" component={AdminSettingsScreen} />
            <Stack.Screen name='ApproveWithdrawal' component={ApproveWithdrawal} />
        </Stack.Navigator>
    );
};

export default AdminStackNavigator;
