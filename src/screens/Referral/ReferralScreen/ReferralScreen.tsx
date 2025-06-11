import { Dimensions, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { Clipboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ReferralPageUpparPart from './ReferralPageUpparPart';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReferralCode, fetchReferralCommission, fetchReferralTree } from '../../../redux/slices/referralSlice';
import Loader from '../../../components/Loader/Loader';


const ReferralScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { height } = Dimensions.get('window');
  const { referralTree, successMsg, errorMsg, referralCode, loading, commission } = useSelector(state => state.referral);
  const dispatch = useDispatch();
  console.log('Commission:', commission);
  console.log('Referral Tree:', referralTree);


  useEffect(() => {
    dispatch(fetchReferralCode());
    dispatch(fetchReferralTree());
    dispatch(fetchReferralCommission());
  }, []);
  const renderItem = ({ item }) => (
    (
      <View style={styles.dataRow}>
        <Text style={styles.cellText}>Level: {item.level}</Text>
        {/* <Text>Name: {item.referredId?.name || 'N/A'}</Text>
        <Text>Email: {item.referredId?.email}</Text>
        <Text>Username: {item.referredId?.username}</Text> */}
        {/* <Text>Role: {item.referredId?.role}</Text> */}
        <Text style={styles.cellText}>Commission: {item.commission}%</Text>
      </View>
    )
  );
  return (
    <SafeAreaView style={styles.MainContainer}>
      {
        loading ? (
          <Loader visible={loading} />
        ) : (
          <>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom + 100 }}
              showsVerticalScrollIndicator={false}
            >
              <ReferralPageUpparPart />

              <Text style={styles.headerText}>Commission Levels</Text>

              <View style={styles.Tablecontainer}>
                <View style={styles.headerRowcontainer}>
                  <Text style={[styles.TableheaderText,{marginLeft: 20}]}>Level</Text>
                  <Text style={styles.TableheaderText}>Commission</Text>
                </View>
                {/* <View style={styles.dataRow}>
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
                </View> */}
                <FlatList
                  data={referralTree}
                  scrollEnabled={false}
                  // horizontal
                  keyExtractor={(_, index) => index.toString()}
                  contentContainerStyle={{ padding: 10 }}
                  ListEmptyComponent={<Text>No referrals yet.</Text>}
                  renderItem={renderItem}
                />
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
          </>
        )
      }

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
    // textAlign: 'center',
    fontSize: RFValue(12),
 

  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    gap: 10,
    
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
