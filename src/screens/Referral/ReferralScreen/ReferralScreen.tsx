// screens/ReferralScreen.tsx
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import ReferralPageUpparPart from './ReferralPageUpparPart';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchReferralCode,
  fetchReferralCommission,
  fetchReferralTree,
} from '../../../redux/slices/referralSlice';
import { fetchRewardInfo } from '../../../redux/slices/rewardSlice';
import { RootState, AppDispatch } from '../../../redux/store';
import Loader from '../../../components/Loader/Loader';
import moment from 'moment';

interface BonusItem {
  name: string;
  date: string;
  amount: number;
  level: number;
}

const ReferralScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();

  const { referralTree, referralLoading, referralCode } = useSelector(
    (state: RootState) => state.referral
  );

  const { summary, loading: summaryLoading, bonusHistory } = useSelector(
    (state: RootState) => state.reward
  );

  const isLoading = summaryLoading || referralLoading;

  useEffect(() => {
    dispatch(fetchReferralCode());
    dispatch(fetchReferralTree());
    dispatch(fetchReferralCommission());
    dispatch(fetchRewardInfo());
  }, [dispatch]);

  const commissionData = [
    { level: 1, commissionPercent: 10 },
    { level: 2, commissionPercent: 5 },
    { level: 3, commissionPercent: 2 },
  ];

  const renderCommissionItem = ({ item }: { item: { level: number; commissionPercent: number } }) => (
    <View style={styles.dataRow}>
      <Text style={styles.cellText}>Level {item.level}</Text>
      <Text style={styles.cellText}>{item.commissionPercent}%</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.MainContainer}>
      {isLoading ? (
        <Loader visible={isLoading} />
      ) : (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom + 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* ✅ PASS referralCode here */}
          <ReferralPageUpparPart referralCode={referralCode} />

          <Text style={styles.headerText}>Commission Levels</Text>
          <View style={styles.Tablecontainer}>
            <View style={styles.headerRowcontainer}>
              <Text style={styles.TableheaderText}>Level</Text>
              <Text style={styles.TableheaderText}>Commission</Text>
            </View>

            <FlatList
              data={commissionData}
              scrollEnabled={false}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderCommissionItem}
              contentContainerStyle={{ padding: 10 }}
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
              <Text style={styles.teamBoxText}>Total Referrals</Text>
              <Text style={styles.teamBoxNumber}>
                {summary?.totalReferrals || '0'}
              </Text>
            </View>
            <View style={[styles.teamBox, { backgroundColor: '#10B981' }]}>
              <Text style={styles.teamBoxText}>Earnings</Text>
              <Text style={styles.teamBoxNumber}>
                ${summary?.earnings || '0'}
              </Text>
            </View>
            <View style={[styles.teamBox, { backgroundColor: '#FF8632' }]}>
              <Text style={styles.teamBoxText}>Active Investors</Text>
              <Text style={styles.teamBoxNumber}>
                {summary?.activeInvestors || '0'}
              </Text>
            </View>
          </View>

          <Text style={[styles.headerText, { marginTop: 30 }]}>Bonus History</Text>
          <View style={styles.Tablecontainer}>
            <View style={styles.headerRowcontainer}>
              <Text style={styles.TableheaderText}>Date</Text>
              <Text style={styles.TableheaderText}>Amount</Text>
              <Text style={styles.TableheaderText}>Level</Text>
            </View>

            {bonusHistory && bonusHistory.length > 0 ? (
              bonusHistory.slice(0, 3).map((item: BonusItem, index: number) => (
                <View key={index} style={[styles.dataRow, { backgroundColor: '#84D299' }]}>
                  <Text style={[styles.cellText, { color: '#fff' }]}>
                    {moment(item.date).format('D MMM YYYY')}
                  </Text>
                  <Text style={[styles.cellText, { color: '#fff' }]}>
                    ${item.amount}
                  </Text>
                  <Text style={[styles.cellText, { color: '#fff' }]}>
                    {item.level}
                  </Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>No bonus history available.</Text>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ReferralScreen;

// Keep your same StyleSheet here (no changes)


const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    margin: 20,
    color: '#222',
  },
  Tablecontainer: {
    borderRadius: 6,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
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
    fontSize: RFValue(12),
    fontWeight: '700',
    color: '#fff',
  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#F3F4F6',
  },
  cellText: {
    flex: 1,
    fontWeight: '600',
    color: '#000',
  },
  showDetailsButtonContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  showDetailsButton: {
    backgroundColor: '#FF8800',
    width: '90%',
    paddingVertical: 10,
    borderRadius: 5,
  },
  showDetailsButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: RFValue(14),
    fontWeight: '500',
  },
  yourTeamContianer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
  },
  teamBox: {
    width: 100,
    height: 70,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  teamBoxText: {
    fontSize: RFValue(7),
    color: '#fff',
    textAlign: 'center',
  },
  teamBoxNumber: {
    fontSize: RFValue(16),
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: RFValue(14),
    color: '#888',
    paddingVertical: 10,
  },
});