import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProfileScreenUpperside from './ProfileScreenUpperside';
import ProfileScreenDownrside from './ProfileScreenDownrside';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeById } from '../../../redux/slices/userSlice';
import Loader from '../../../components/Loader/Loader';


const ProfileScreen = () => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const { height } = Dimensions.get('window');
  const { userId } = useSelector((state) => state.auth);
  const { userDetails, wallet, loading } = useSelector((state) => state.user);
  // console.log('User ID:', userId);
  // console.log('User Details:', userDetails);
  useEffect(() => {
    if (userId) {
      dispatch(getEmployeeById(userId));
    }
  }, [userId]);
  return (
    <SafeAreaView style={styles.MainContainer}>
      {
        loading || !userDetails ? (
          <Loader visible={true} />
        ) : (
          <>
            <ScrollView
              contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
              showsVerticalScrollIndicator={false}
            >
              <ProfileScreenUpperside />
              <ProfileScreenDownrside />
            
            </ScrollView>
          </>
        )
      }

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