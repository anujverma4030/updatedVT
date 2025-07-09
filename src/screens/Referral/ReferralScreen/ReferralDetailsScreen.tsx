import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
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

  const { summary, referralLoading } = useSelector(
    (state: RootState) => state.referral
  );

  const [selectedLevel, setSelectedLevel] = useState<'level1' | 'level2' | 'level3'>('level1');

  useEffect(() => {
    dispatch(fetchReferralSummary());
  }, [dispatch]);

  const levelNumber: Record<'level1' | 'level2' | 'level3', number> = {
    level1: 1,
    level2: 2,
    level3: 3,
  };

  const levels = [
    { label: 'LEVEL 1', commission: '10%', key: 'level1' },
    { label: 'LEVEL 2', commission: '5%', key: 'level2' },
    { label: 'LEVEL 3', commission: '2%', key: 'level3' },
  ];

  const levelData: ReferralItem[] = (summary?.referrals || []).filter(
    (item: ReferralItem) => item.level === levelNumber[selectedLevel]
  );

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
      {/* Header */}
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
          {/* Tabs */}
          <View style={styles.tabs}>
            {levels.map((level) => (
              <TouchableOpacity
                key={level.key}
                style={[styles.tab, selectedLevel === level.key && styles.activeTab]}
                onPress={() => setSelectedLevel(level.key as 'level1' | 'level2' | 'level3')}
              >
                <Text style={[styles.tabLabel, selectedLevel === level.key && styles.activeLabel]}>
                  {level.label}
                </Text>
                <Text style={[styles.tabSubLabel, selectedLevel === level.key && styles.activeLabel]}>
                  {level.commission} Commission
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Name</Text>
            <Text style={styles.headerCell}>Joined On</Text>
            <Text style={styles.headerCell}>Commission</Text>
          </View>

          {/* Table */}
          <FlatList
            data={levelData}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No referrals yet for this level.</Text>
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ReferralDetailsScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#34A853',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  headerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
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
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    backgroundColor: '#34A853',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tab: {
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#fff',
  },
  tabLabel: {
    fontWeight: 'bold',
    color: '#ccc',
  },
  activeLabel: {
    color: '#fff',
  },
  tabSubLabel: {
    fontSize: 12,
    color: '#000',
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
