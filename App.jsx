import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
// import AppNavigators from './src/navigation/AppNavigator/AppNavigator'
import MainStackNavigator from './src/navigation/MainStackNavigator'
// import HomeScreen from './src/screens/Home/HomeScreen'


const App = () => {
  return (
    <SafeAreaProvider>
      {/* <AppNavigators/> */}
      {/* <HomeScreen/> */}
      <MainStackNavigator />
    </SafeAreaProvider>
  )
}

export default App

const styles = StyleSheet.create({})