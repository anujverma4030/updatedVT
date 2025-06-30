import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import MainStackNavigator from './src/navigation/MainStackNavigator'
// import AdminSettingsScreen from './src/screens/adminTemplateScreens/AdminSettingsScreen'
import AppNavigators from './src/navigation/AppNavigator/AppNavigator'
import SpinWheel from './src/screens/SpinWheel/spinwheele'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from './src/redux/store'
import { loadToken } from './src/redux/slices/authSlice'
import jwtDecode from 'jwt-decode';
import AdminStackNavigator from './src/navigation/AdminStackNavigator'


const App = () => {
  const dispatch = useDispatch();
  const { userToken, loading } = useSelector((state) => state.auth);
  // console.log('User Token in app.js:', userToken, 'Loading:', loading);
  useEffect(() => {
    dispatch(loadToken());
  }, []);
 
  return (
    <MainStackNavigator />
    // <AdminStackNavigator/>
    
  )
}

export default App

const styles = StyleSheet.create({})