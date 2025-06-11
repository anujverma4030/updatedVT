import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Loader from '../../components/Loader/Loader'
import AdminTemplateHeaderPart from '../../components/Header/AdminTemplateHeaderPart'

const ReferralsScreen = () => {
  const [loading, setLoading] = useState(false)
  return (
    <>
    <StatusBar backgroundColor={'transparent'} barStyle={"dark-content"} translucent />

    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {
        loading ? (
          <Loader visible={loading} />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            <AdminTemplateHeaderPart name='Refrerrals' paddingBottom={20} />
            <View style={styles.container}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.HorizentalScrollContainer}
              >
              </ScrollView>
            </View>
          </ScrollView>

        )
      }
    </SafeAreaView>
  </>
  )
}

export default ReferralsScreen

const styles = StyleSheet.create({})