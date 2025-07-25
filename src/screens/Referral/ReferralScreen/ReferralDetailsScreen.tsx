import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  
} from 'react-native';
import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReferralSummary } from '../../../redux/slices/referralSlice';
import { RootState, AppDispatch } from '../../../redux/store';
import moment from 'moment';
import Loader from '../../../components/Loader/Loader';

type ReferralItem = {
  referredUser?: {
    name?: string;
    username?: string;
    email?: string;
    createdAt?: string;
  };
  createdAt?: string;
  isCommissionGiven?: boolean;
  level?: number;
};

const ReferralDetailsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();

  const { summary, referralLoading, errorMsg } = useSelector(
    (state: RootState) => state.referral
  );

  useEffect(() => {
    dispatch(fetchReferralSummary());
  }, [dispatch]);

  useEffect(() => {
  // Alert.alert('Full Summary', JSON.stringify(summary, null, 2));
}, [summary]);


  useEffect(() => {
    const referrals = summary?.referrals as ReferralItem[];
    if (referrals?.length > 0) {
      const sample = referrals[0];
      // Alert.alert(
      //   'Referral Debug',
      //   `Name: ${sample?.referredUser?.name || 'N/A'}\nUsername: ${sample?.referredUser?.username || 'N/A'}\nLevel: ${sample?.level || 'N/A'}\nCommission: ${sample?.isCommissionGiven ? 'Yes' : 'No'}`
      // );
    } else {
      // Alert.alert('Referral Debug', 'No referrals found.');
    }
  }, [summary]);

  useEffect(() => {
    if (errorMsg) {
      // Alert.alert('Referral Error', String(errorMsg));
    }
  }, [errorMsg]);

  const renderItem = ({ item }: { item: ReferralItem }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.referredUser?.name || 'N/A'}</Text>
      <Text style={styles.cell}>
        {item.createdAt ? moment(item.createdAt).format('DD MMM YYYY') : 'N/A'}
      </Text>
      <Text style={[styles.cell, { color: item.isCommissionGiven ? '#10B981' : '#EF4444' }]}>
        {item.isCommissionGiven ? '✅ Yes' : '❌ No'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.MainContainer}>
      <View style={styles.headerContentContainer}>
        <View style={styles.headerTextContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Referral Details</Text>
        </View>
      </View>

      {referralLoading ? (
        <Loader visible />
      ) : (
        <View style={styles.tabsMainContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Name</Text>
            <Text style={styles.headerCell}>Joined On</Text>
            <Text style={styles.headerCell}>Commission</Text>
          </View>

          <FlatList
            data={summary?.referrals as ReferralItem[]}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No referrals available.</Text>
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ReferralDetailsScreen;

const styles = StyleSheet.create({
  MainContainer: { flex: 1, backgroundColor: '#fff' },
  headerContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#34A853',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  headerTextContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  headerText: {
    fontSize: RFValue(18),
    fontWeight: '500',
    color: '#fff',
    marginLeft: 10,
  },
  tabsMainContainer: {
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 10,
    elevation: 3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: RFValue(12),
    color: '#000',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingHorizontal: 10,
  },
  cell: {
    flex: 1,
    fontSize: RFValue(13),
    color: '#000',
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#888',
  },
});
