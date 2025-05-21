import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import MainStackNavigator from './src/navigation/MainStackNavigator'
// import AdminSettingsScreen from './src/screens/adminTemplateScreens/AdminSettingsScreen'

import AppNavigators from './src/navigation/AppNavigator/AppNavigator'

// import HomeScreen from './src/screens/Home/HomeScreen'


const App = () => {
  return (
    <SafeAreaProvider>
      {/* <AppNavigators /> */}
      {/* <HomeScreen/> */}
      <MainStackNavigator />
  
      {/* <AdminSettingsScreen/> */}
    </SafeAreaProvider>
  )
}

export default App

const styles = StyleSheet.create({})