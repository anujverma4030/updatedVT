import { ScrollView, StatusBar, StyleSheet, Text, View , SafeAreaView,} from 'react-native'
import React, { use, useEffect } from 'react'
import Loader from '../../components/Loader/Loader'

import AdminTemplateHeaderPart from '../../components/Header/AdminTemplateHeaderPart'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { fetchAllInvestmentPlans } from '../../redux/slices/adminSlice'

const InvestmentPlans = () => {
  const { investmentPlans, loading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  console.log('InvestmentPlans', investmentPlans);
  useEffect(() => {
    dispatch(fetchAllInvestmentPlans());
  }, [dispatch]);
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
              <AdminTemplateHeaderPart name='Investment Plans' paddingBottom={20} />
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
export default InvestmentPlans

const styles = StyleSheet.create({})