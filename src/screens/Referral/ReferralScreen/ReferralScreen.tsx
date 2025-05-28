import { Dimensions, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';

import { useNavigation } from '@react-navigation/native';
import ReferralPageUpparPart from './ReferralPageUpparPart';

const ReferralScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { height } = Dimensions.get('window');
  return (
    <SafeAreaView style={styles.MainContainer}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        <ReferralPageUpparPart />

        <Text style={styles.headerText}>Commission Levels</Text>

        <View style={styles.Tablecontainer}>
          <View style={styles.headerRowcontainer}>
            <Text style={styles.TableheaderText}>Level</Text>
            <Text style={styles.TableheaderText}>Commission</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.cellText}>Level 1</Text>
            <Text style={styles.cellText}>10%</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.cellText}>Level 2</Text>
            <Text style={styles.cellText}>5%</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.cellText}>Level 3</Text>
            <Text style={styles.cellText}>2%</Text>
          </View>
          <View style={styles.showDetailsButtonContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ReferralDetails')}
              style={styles.showDetailsButton}
            >
              <Text style={styles.showDetailsButtonText}>Show Details</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={[styles.headerText, { marginTop: 40 }]}>Your Team</Text>
        <View style={styles.yourTeamContianer}>
          <View style={[styles.teamBox, { backgroundColor: '#FDBE00' }]}>
            <Text style={styles.teamBoxText}>Total Refferrals</Text>
            <Text style={styles.teamBoxNumber}>25</Text>
          </View>
          <View style={[styles.teamBox, { backgroundColor: '#10B981' }]}>
            <Text style={styles.teamBoxText}>Earnings</Text>
            <Text style={styles.teamBoxNumber}>$700</Text>
          </View>
          <View style={[styles.teamBox, { backgroundColor: '#FF8632' }]}>
            <Text style={styles.teamBoxText}>Active Investors</Text>
            <Text style={styles.teamBoxNumber}>15</Text>
          </View>
        </View>

        <Text style={[styles.headerText, { marginTop: 30 }]}>Bonus History</Text>

        <View style={styles.Tablecontainer}>
          <View style={styles.headerRowcontainer}>
            <Text style={styles.TableheaderText}>Date</Text>
            <Text style={styles.TableheaderText}>Amount</Text>
            <Text style={styles.TableheaderText}>Level</Text>
          </View>
          <View style={[styles.dataRow, { backgroundColor: '#84D299' }]}>
            <Text style={[styles.cellText, { color: '#fff' }]}>20 April, 2025</Text>
            <Text style={[styles.cellText, { color: '#fff' }]}>$100</Text>
            <Text style={[styles.cellText, { color: '#fff' }]}>1</Text>
          </View>
          <View style={[styles.dataRow, { backgroundColor: '#84D299' }]}>
            <Text style={[styles.cellText, { color: '#fff' }]}>10 April, 2025</Text>
            <Text style={[styles.cellText, { color: '#fff' }]}>$50</Text>
            <Text style={[styles.cellText, { color: '#fff' }]}>2</Text>
          </View>
          <View style={[styles.dataRow, { backgroundColor: '#84D299' }]}>
            <Text style={[styles.cellText, { color: '#fff' }]}>10 April, 2025</Text>
            <Text style={[styles.cellText, { color: '#fff' }]}>$20</Text>
            <Text style={[styles.cellText, { color: '#fff' }]}>3</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ReferralScreen

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: RFValue(20),
    fontWeight: 'normal',
    margin: 20
  },
  Tablecontainer: {
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 10,
    elevation: 3,
  },
  headerRowcontainer: {
    flexDirection: 'row',
    backgroundColor: '#34A853',
    padding: 10,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  TableheaderText: {
    flex: 1,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'left',
  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  cellText: {
    flex: 1,
    textAlign: 'left',
    fontWeight: '600',
  },
  showDetailsButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  showDetailsButton: {
    backgroundColor: '#FF8800',
    width: '90%',
    paddingVertical: 8,
    borderRadius: 5,
    marginVertical: 10
  },
  showDetailsButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: RFValue(14),
    fontWeight: "500"
  },
  yourTeamContianer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  teamBox: {
    width: 95,
    height: 62,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: "center"
  },
  teamBoxText: {
    color: '#fff',
    fontSize: RFValue(10),
  },
  teamBoxNumber: {
    color: '#fff',
    fontSize: RFValue(20),
  },
})
