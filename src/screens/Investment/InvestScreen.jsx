import {
  ActivityIndicator,
  // Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import Slider from '@react-native-community/slider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchActiveInvestments,
  fetchInvestmentHistory,
  fetchInvestmentPlans,
  subscribeToPlan,
} from '../../redux/slices/investmentSlice';
import Loader from '../../components/Loader/Loader';
import moment from 'moment';

const InvestScreen = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const { plans, activeInvestments, investmentHistory, loading } = useSelector(state => state.investment);
  const [loadingPlanId, setLoadingPlanId] = useState(null);


const topPlans = useMemo(() => Array.isArray(plans) ? plans : [], [plans]);



  const completedInvestments = useMemo(() =>
    investmentHistory
      .filter(item => item.status?.toLowerCase() !== 'active')
      .slice(0, 4),
    [investmentHistory]
  );

// useEffect(() => {
//   if (plans && plans.length > 0) {
//     console.log('Fetched Plans:', plans.map(p => p.name));
//     const planNames = plans.map(p => p.name).join(', ');
//     Alert.alert('Plans from backend:', planNames);
//   }
// }, [plans]);


  useEffect(() => {
    dispatch(fetchInvestmentPlans());
    dispatch(fetchActiveInvestments());
    dispatch(fetchInvestmentHistory());
  }, []);     

  const planColors = {
    'Basic Plan': '#0077FFD9',
    'Starter Plan': '#00BFA5D9',
    'Ultra Plan': '#8E24AAD9',
    'Gold Plan': '#FDBE00D9',
    'Premium Plan': '#3F51B5D9',
    'Super Plan': '#FF6F00D9',
    'Standard Plan': '#607D8BD9',
  };

  const handleSubscribeInvestment = async (planId, payload) => {
    try {
      setLoadingPlanId(planId);
      const result = await dispatch(subscribeToPlan({ id: planId, payload })); 
      if (subscribeToPlan.fulfilled.match(result)) {
        Alert.alert("Success", "Investment successful.");
        await dispatch(fetchActiveInvestments());
        await dispatch(fetchInvestmentHistory());
      } else {
        Alert.alert('Error', result?.payload || 'Subscription failed');
      }
    } catch (err) {
      Alert.alert('Error', err.message || 'Something went wrong');
    } finally {
      setLoadingPlanId(null);
    }
  };

  const renderPlan = ({ item }) => {
    const backgroundColor = planColors[item.name] || '#0077FFD9';
    const isLoading = loadingPlanId === item._id;
    return (
      <View style={styles.card}>
        <View style={[styles.borderBar, { backgroundColor }]} />
        <View style={styles.content}>
          <View style={styles.textSection}>
            <View style={styles.titleRow}>
              <Icon name="schedule" size={RFValue(14)} color="#2E7D32" />
              <Text style={styles.title}>{item.name}</Text>
            </View>
            <Text style={styles.text}>ROI: {item.roiPercent}%</Text>
            <Text style={styles.text}>Min Amount: ${item.minAmount}</Text>
            <Text style={styles.text}>Duration: {item.durationDays} Days</Text>
            <Text style={styles.text}>Auto Payout: {item.autoPayout ? 'Yes' : 'No'}</Text>
          </View>
          <Image source={require('../../assests/investMan.png')} style={styles.image} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            disabled={isLoading}
            activeOpacity={0.7}
            style={[styles.button, { backgroundColor }]}
            onPress={() =>
              handleSubscribeInvestment(item._id, {
                amount: item.minAmount,
                startDate: new Date().toISOString(),
                endDate: new Date(Date.now() + item.durationDays * 24 * 60 * 60 * 1000).toISOString(),
              })
            }
          >
            <Text style={styles.buttonText}>
              {isLoading ? <ActivityIndicator size={15} color="#fff" /> : 'Invest Now'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderOngoingInvestment = ({ item }) => {
    const planName = typeof item.planId === 'object' ? item.planId.name : item.planId || 'N/A';
    const color = planColors[planName] || '#0077FF';
    const invested = item.amount ?? 0;
    const earnings = item.earnings ?? 0;
    const nextPayout = item.nextPayoutDate ? moment(item.nextPayoutDate).format('MMM DD, YYYY') : 'N/A';
    const endDate = item.endDate ? moment(item.endDate).format('MMM DD, YYYY') : 'N/A';
    const start = moment(item.startDate);
    const end = moment(item.endDate);
    const now = moment();
    const progress = Math.min(Math.max(now.diff(start, 'days') / end.diff(start, 'days'), 0), 1);

    return (
      <View style={[styles.ongoingCard, { backgroundColor: color }]}>
        <View style={styles.ongoingTopRow}>
          <Icon name="bolt" color="#fff" size={18} />
          <Text style={styles.ongoingPlanTitle}>{planName}</Text>
        </View>
        <Text style={styles.progressLabel}>Progress</Text>
        <Slider
          style={{ width: '100%', height: 20 }}
          value={progress}
          minimumValue={0}
          maximumValue={1}
          disabled
          minimumTrackTintColor="#fff"
          maximumTrackTintColor="#ccc"
          thumbTintColor="#fff"
        />
        <Text style={styles.ongoingText}>Invested: ${invested}</Text>
        <Text style={styles.ongoingText}>Earnings: ${earnings}</Text>
        <Text style={styles.ongoingText}>Next Payout: {nextPayout}</Text>
        <Text style={styles.ongoingText}>End Date: {endDate}</Text>
      </View>
    );
  };

  const renderInvestmentHistory = ({ item }) => {
    const planName = typeof item.planid === 'object' ? item.planId.name : item.planid || 'N/A';
    const color = planColors[planName] || '#2E7D32';
    const statusColor = (item?.status || '').toLowerCase() === 'active' ? '#4CAF50' : '#F44336';
    return (
      <View style={styles.dataRow}>
        <Text style={[styles.cellText, { color }]}>{planName}</Text>
        <Text style={[styles.cellText, { color }]}>${item?.amount ?? 0}</Text>
        <Text style={[styles.cellText, { color }]}>{item?.endDate ? moment(item.endDate).format('MMM DD, YYYY') : 'N/A'}</Text>
        <Text style={[styles.cellText, { color: statusColor }]}>{item?.status || 'Completed'}</Text>
      </View>
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      {loading ? <Loader visible /> : (
        <SafeAreaView style={styles.MainContainer}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom + 100 }}>
            <View style={[styles.headerContainer, { paddingTop: insets.top + 50 }]}>
              <Text style={styles.headerText}>Choose Your Investment Plan</Text>
              <TouchableOpacity><Icon name="notifications" size={20} color="#fff" /></TouchableOpacity>
            </View>

            <FlatList
              data={topPlans}
              keyExtractor={item => item._id}
              renderItem={renderPlan}
              scrollEnabled={false}
            />

            <Text style={styles.investmentHeaderText}>Ongoing Investments</Text>
            <FlatList
              data={activeInvestments}
              horizontal
              keyExtractor={(item, index) => item._id || index.toString()}
              renderItem={renderOngoingInvestment}
              contentContainerStyle={{ paddingLeft: 20 }}
            />

            <Text style={styles.investmentHeaderText}>Past Investments</Text>
            <View style={styles.InvestmentTablecontainer}>
              <View style={styles.InvestmentTableheaderRow}>
                <Text style={styles.InvestmentTableheaderText}>Plan</Text>
                <Text style={styles.InvestmentTableheaderText}>Amount</Text>
                <Text style={styles.InvestmentTableheaderText}>End Date</Text>
                <Text style={styles.InvestmentTableheaderText}>Status</Text>
              </View>

              <FlatList
                data={completedInvestments}
                keyExtractor={(item, index) => item._id || index.toString()}
                renderItem={renderInvestmentHistory}
                scrollEnabled={false}
                contentContainerStyle={{ paddingBottom: 10 }}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default InvestScreen;


const styles = StyleSheet.create({
  MainContainer: { flex: 1, backgroundColor: '#fff' },
  headerContainer: {
    backgroundColor: '#34A853',
    width: '100%',
    height: 160,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  headerText: { color: '#fff', fontSize: RFValue(20), fontWeight: '500' },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 15,
    marginHorizontal: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    gap: 10,
    position: 'relative',
  },
  borderBar: {
    width: 6,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    position: 'absolute',
    height: '100%',
    left: 0,
  },
  content: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1 },
  textSection: { flex: 1, marginLeft: 25 },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 5 },
  title: { fontSize: RFValue(14), fontWeight: '500', color: '#000' },
  text: { fontSize: RFValue(10), color: '#444' },
  buttonContainer: { justifyContent: 'center', alignItems: 'center' },
  button: {
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 12,
    borderRadius: 6,
    width: '85%',
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 14, textAlign: 'center' },
  image: { width: 100, height: 100, resizeMode: 'contain', marginRight: 20 },
  investmentHeaderText: { margin: 15, fontSize: RFValue(20), fontWeight: '500' },
  InvestmentTablecontainer: {
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 10,
    elevation: 3,
  },
  InvestmentTableheaderRow: {
    flexDirection: 'row',
    backgroundColor: '#34A853',
    padding: 10,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  InvestmentTableheaderText: {
    flex: 1,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
  dataRow: { flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 10 },
  cellText: { flex: 1, textAlign: 'center', fontWeight: '600' },
  ongoingCard: { width: 220, borderRadius: 12, padding: 12, marginRight: 15, elevation: 4 },
  ongoingTopRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  ongoingPlanTitle: { color: '#fff', fontSize: RFValue(14), fontWeight: '700' },
  progressLabel: { color: '#fff', fontSize: RFValue(10), marginBottom: 4 },
  ongoingText: { fontSize: RFValue(10), color: '#fff', marginBottom: 2 },
});