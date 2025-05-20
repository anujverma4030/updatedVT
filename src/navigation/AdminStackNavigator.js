import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashBoardScreen from '../../utils/sorce/adminTemplateScreens/DashBoardScreen';
import UsersScreen from '../../utils/sorce/adminTemplateScreens/UsersScreen';
import InvestmentsScreen from '../components/InvestmentCard/InvestmentsScreen';
import SpinLogsScreen from '../../utils/sorce/adminTemplateScreens/SpinLogsScreen';
import DepositsScreen from '../../utils/sorce/adminTemplateScreens/DepositsScreen';
import WithdrawalsScreen from '../../utils/sorce/adminTemplateScreens/WithdrawalsScreen';
import AdminSettingsScreen from '../../utils/sorce/adminTemplateScreens/AdminSettingsScreen';


const Stack = createNativeStackNavigator();

const AdminStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={DashBoardScreen} />
            <Stack.Screen name="Users" component={UsersScreen} />
            <Stack.Screen name="Investments" component={InvestmentsScreen} />
            <Stack.Screen name="SpinLogs" component={SpinLogsScreen} />
            <Stack.Screen name="Deposits" component={DepositsScreen} />
            <Stack.Screen name="Withdrawals" component={WithdrawalsScreen} />
            <Stack.Screen name="Settings" component={AdminSettingsScreen} />
        </Stack.Navigator>
    );
};

export default AdminStackNavigator;
