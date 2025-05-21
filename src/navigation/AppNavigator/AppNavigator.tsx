import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainStackNavigator from '../MainStackNavigator';
import DashBoardScreen from '../../screens/adminTemplateScreens/DashBoardScreen';
import AdminStackNavigator from '../AdminStackNavigator';
const Stack = createNativeStackNavigator();
const AppNavigators = () => {
  return (
    <NavigationContainer>
   {/* <MainStackNavigator/> */}
    {/* <DashBoardScreen/> */}
    <AdminStackNavigator/>
  </NavigationContainer>
  );
}
export default AppNavigators