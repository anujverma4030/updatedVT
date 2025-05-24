import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import MainStackNavigator from './src/navigation/MainStackNavigator'
// import AdminSettingsScreen from './src/screens/adminTemplateScreens/AdminSettingsScreen'
import AppNavigators from './src/navigation/AppNavigator/AppNavigator'
import SpinWheel from './src/screens/SpinWheel/spinwheele'
import Loader from './src/components/Loader/Loader'
import {  AuthProvider } from './src/context/AuthContext'
const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <MainStackNavigator />
        {/* <AdminSettingsScreen/> */}
        {/* <SpinWheel/> */}
        {/* <Loader/> */}
      </AuthProvider>
    </SafeAreaProvider>
  )
}

export default App

const styles = StyleSheet.create({})