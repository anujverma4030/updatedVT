import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import MainStackNavigator from './src/navigation/MainStackNavigator'
// import AdminSettingsScreen from './src/screens/adminTemplateScreens/AdminSettingsScreen'
import AppNavigators from './src/navigation/AppNavigator/AppNavigator'
import SpinWheel from './src/screens/SpinWheel/spinwheele'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'



const App = () => {

  return (
    <Provider store={store}>
      <MainStackNavigator />
    </Provider>

  )
}

export default App

const styles = StyleSheet.create({})