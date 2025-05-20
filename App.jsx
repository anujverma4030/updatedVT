import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import AppNavigators from './src/navigation/AppNavigator/AppNavigator'
// import HomeScreen from './src/screens/Home/HomeScreen'


const App = () => {
  return (
    <SafeAreaProvider>
  <AppNavigators/>
  {/* <HomeScreen/> */}
    </SafeAreaProvider>
  )
}

export default App

const styles = StyleSheet.create({})