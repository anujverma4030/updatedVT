import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import MainStackNavigator from './src/navigation/MainStackNavigator'
// import AdminSettingsScreen from './src/screens/adminTemplateScreens/AdminSettingsScreen'
import AppNavigators from './src/navigation/AppNavigator/AppNavigator'
import SpinWheel from './src/screens/SpinWheel/spinwheele'
const App = () => {
  return (
    <SafeAreaProvider>
      <MainStackNavigator />
      {/* <AdminSettingsScreen/> */}
      {/* <SpinWheel/> */}
    </SafeAreaProvider>
  )
}

export default App

const styles = StyleSheet.create({})