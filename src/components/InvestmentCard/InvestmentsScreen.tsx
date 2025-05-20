import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import AdminTemplateHeaderPart from '../Header/AdminTemplateHeaderPart'
import { RFValue } from 'react-native-responsive-fontsize'
import { TextInput } from 'react-native-gesture-handler'

const investments = new Array(5).fill({
  userId: 'UU01',
  planName: 'Gold',
  amount: 'Rs.500',
  roi: '2.5%',
  status: 'Active',
  date: '1/25–15/25',
})

const columnWidths = {
  userId: 80,
  planName: 100,
  amount: 100,
  roi: 100,
  status: 100,
  date: 100,
}

const InvestmentsScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <AdminTemplateHeaderPart name='Investments' paddingBottom={20}/>
        <View style={styles.container}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.HorizentalScrollContainer}
          >
            <View style={styles.TableContainer}>
              <View style={[styles.row, styles.headerRow]}>
                <Text style={[styles.headerCell, { width: columnWidths.userId }]}>User ID</Text>
                <Text style={[styles.headerCell, { width: columnWidths.planName }]}>Plan Name</Text>
                <Text style={[styles.headerCell, { width: columnWidths.amount }]}>Amount</Text>
                <Text style={[styles.headerCell, { width: columnWidths.roi }]}>R.O.I</Text>
                <Text style={[styles.headerCell, { width: columnWidths.status }]}>Status</Text>
                <Text style={[styles.headerCell, { width: columnWidths.date }]}>Dates</Text>
              </View>

              {investments.map((item, index) => (
                <View style={styles.row} key={index}>
                  <Text style={[styles.cell, { width: columnWidths.userId }]}>{item.userId}</Text>
                  <Text style={[styles.cell, { width: columnWidths.planName }]}>{item.planName}</Text>
                  <Text style={[styles.cell, { width: columnWidths.amount }]}>{item.amount}</Text>
                  <Text style={[styles.cell, { width: columnWidths.roi }]}>{item.roi}</Text>
                  <Text style={[styles.cell, { width: columnWidths.status }]}>{item.status}</Text>
                  <Text style={[styles.cell, { width: columnWidths.date }]}>{item.date}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default InvestmentsScreen

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#F3F3F3",
    margin: 10,
    borderRadius: 6
  },
  HorizentalScrollContainer: {
    backgroundColor: '#fff',
  },
  TableContainer: {

  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  headerRow: {
    backgroundColor: '#4CAF50',
  },
  headerCell: {
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 10,
  },
  cell: {
    paddingHorizontal: 10,
  },
  link: {
    color: 'blue',
    marginRight: 10,
    textDecorationLine: 'underline'
  },
  reject: {
    color: 'red',
    textDecorationLine: 'underline'
  },
})