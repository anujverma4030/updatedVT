import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const App = () => {
  return (
    <SafeAreaProvider>
      <>
        <StatusBar barStyle={"dark-content"} backgroundColor={'#fff'} />
        <SafeAreaView>
          <Text>App</Text>
        </SafeAreaView>
      </>
    </SafeAreaProvider>
  )
}

export default App

const styles = StyleSheet.create({})