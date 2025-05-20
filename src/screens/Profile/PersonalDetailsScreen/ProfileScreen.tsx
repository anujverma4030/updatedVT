import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProfileScreenUpperside from './ProfileScreenUpperside';
import ProfileScreenDownrside from './ProfileScreenDownrside';


const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const { height } = Dimensions.get('window');
  return (
    <SafeAreaView style={styles.MainContainer}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        <ProfileScreenUpperside />
        <ProfileScreenDownrside />
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

})