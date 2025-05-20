import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

type LevelKey = 'level1' | 'level2' | 'level3';

const levels = [
  { label: 'LEVEL 1', commission: '10%', key: 'level1' },
  { label: 'LEVEL 2', commission: '20%', key: 'level2' },
  { label: 'LEVEL 3', commission: '30%', key: 'level3' },
] as const;

const data: Record<LevelKey, { name: string; referredBy?: string; date: string; earnings: string }[]> = {
  level1: [
    { name: 'Aman Singh', date: '2025-04-15', earnings: '₹50' },
    { name: 'Aman Singh', date: '2025-04-15', earnings: '₹50' },
  ],
  level2: [
    { name: 'Rohit Saini', referredBy: 'Aman Singh', date: '2025-04-15', earnings: '₹90' },
    { name: 'Rohit Saini', referredBy: 'Aman Singh', date: '2025-04-15', earnings: '₹90' },
  ],
  level3: [
    { name: 'Rohit Saini', referredBy: 'Aman Singh', date: '2025-04-15', earnings: '₹90' },
    { name: 'Rohit Saini', referredBy: 'Aman Singh', date: '2025-04-15', earnings: '₹90' },
    { name: 'Rohit Saini', referredBy: 'Aman Singh', date: '2025-04-15', earnings: '₹90' },
    { name: 'Rohit Saini', referredBy: 'Aman Singh', date: '2025-04-15', earnings: '₹90' },
  ],
};

const ReferralDetailsScreen = () => {
  const navigation = useNavigation();
  const [selectedLevel, setSelectedLevel] = useState<LevelKey>('level1');

  const renderItem = ({ item }: { item: typeof data[LevelKey][number] }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.name}</Text>
      {selectedLevel !== 'level1' && <Text style={styles.cell}>{item.referredBy}</Text>}
      <Text style={styles.cell}>{item.date}</Text>
      <Text style={styles.cell}>{item.earnings}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerContentContainer}>
        <View style={styles.headerTextContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name='arrow-back' size={20} color='#fff' />
          </TouchableOpacity>
          <Text style={styles.headerText}>Referral Earnings</Text>
        </View>
        <TouchableOpacity>
          <Icon name='notifications' size={20} color='#fff' />
        </TouchableOpacity>
      </View>

      <View style={[styles.tabsMainContainer, { padding: 16 }]}>
        <View style={styles.tabs}>
          {levels.map((level) => (
            <TouchableOpacity
              key={level.key}
              style={[styles.tab, selectedLevel === level.key && styles.activeTab]}
              onPress={() => setSelectedLevel(level.key)}
            >
              <Text style={[styles.tabLabel, selectedLevel === level.key && styles.activeLabel]}>
                {level.label}
              </Text>
              <Text style={styles.tabSubLabel}>{level.commission} Commission</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Name</Text>
          {selectedLevel !== 'level1' && <Text style={styles.headerCell}>Referred By</Text>}
          <Text style={styles.headerCell}>Joined On</Text>
          <Text style={styles.headerCell}>Earnings</Text>
        </View>

        <FlatList
          data={data[selectedLevel]}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ReferralDetailsScreen;

const styles = StyleSheet.create({
  headerContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#34A853',
    paddingVertical: 30,
    paddingHorizontal: 30
  },
  headerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  headerText: {
    fontSize: RFValue(20),
    fontWeight: '500',
    color: '#fff'
  },
  tabsMainContainer: {
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 10,
    elevation: 3,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    backgroundColor: '#84D299'
  },
  tab: {
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#FFA726',
  },
  tabLabel: {
    fontWeight: 'bold',
    color: '#555',
  },
  activeLabel: {
    color: '#34A853',
  },
  tabSubLabel: {
    fontSize: 12,
    color: '#999',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F1F1F1',
    padding: 10,
    borderRadius: 6,
    marginBottom: 6,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  cell: {
    flex: 1,
    fontSize: 13,
    textAlign: 'center',
  },
});
