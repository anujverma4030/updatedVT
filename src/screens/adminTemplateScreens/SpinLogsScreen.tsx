import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import AdminTemplateHeaderPart from '../../../src/components/Header/AdminTemplateHeaderPart'
import { RFValue } from 'react-native-responsive-fontsize'
import { TextInput } from 'react-native-gesture-handler'

const spinLogs = [
  { date: '1/2/25', userId: 'UU01', result: 'Win', amount: 'Rs.200' },
  { date: '1/2/25', userId: 'UU01', result: 'Win', amount: 'Rs.300' },
  { date: '1/2/25', userId: 'UU01', result: 'Win', amount: 'Rs.200' },
  { date: '1/2/25', userId: 'UU01', result: 'Win', amount: 'Rs.400' },
]

const columnWidths = {
  date: 100,
  userId: 100,
  result: 100,
  amount: 120,
}

const SpinLogsScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <AdminTemplateHeaderPart name='Spin Logs' paddingBottom={20}/>
        <View style={styles.container}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.HorizentalScrollContainer}
          >
            <View style={styles.TableContainer}>
              <View style={[styles.row, styles.headerRow]}>
                <Text style={[styles.headerCell, { width: columnWidths.date }]}>Dates</Text>
                <Text style={[styles.headerCell, { width: columnWidths.userId }]}>User ID</Text>
                <Text style={[styles.headerCell, { width: columnWidths.result }]}>Spin Result</Text>
                <Text style={[styles.headerCell, { width: columnWidths.amount }]}>Amount Credited</Text>
              </View>

              {spinLogs.map((log, index) => (
                <View style={styles.row} key={index}>
                  <Text style={[styles.cell, { width: columnWidths.date }]}>{log.date}</Text>
                  <Text style={[styles.cell, { width: columnWidths.userId }]}>{log.userId}</Text>
                  <Text style={[styles.cell, { width: columnWidths.result }]}>{log.result}</Text>
                  <Text style={[styles.cell, { width: columnWidths.amount }]}>{log.amount}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SpinLogsScreen

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