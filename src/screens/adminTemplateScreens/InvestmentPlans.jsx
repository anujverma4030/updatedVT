import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
  Alert,
} from 'react-native';
import React, { useCallback } from 'react';
import Loader from '../../components/Loader/Loader';
import AdminTemplateHeaderPart from '../../components/Header/AdminTemplateHeaderPart';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {
  fetchAllInvestmentPlans,
  setSelectedPlan,
  deleteInvestmentPlan,
} from '../../redux/slices/adminSlice';
import PlanCard from '../../components/planCard/PlanCard';



const InvestmentPlans = () => {
  const { investmentPlans, loading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchAllInvestmentPlans());
    }, [dispatch])
  );

  const handleEdit = (plan, color, mode = 'edit') => {
    dispatch(
      setSelectedPlan({
        plan: {
          _id: plan._id,
          name: plan.name || plan.title || '',
          roiPercent: plan.roiPercent || plan.roi || '',
          minAmount: plan.minAmount || plan.amount || '', // ✅ fix this from `amount`
          durationDays: plan.durationDays || plan.duration || '', // ✅ fix this from `duration`
          payoutType: plan.payoutType || plan.payout || '',
          color,
        }, mode,
      })
    );
    navigation.navigate('EditPlan');
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Plan?',
      'Are you sure you want to delete this plan?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            (async () => {
              try {
                await dispatch(deleteInvestmentPlan(id));
                dispatch(fetchAllInvestmentPlans());
              } catch (error) {
                console.error('Delete failed:', error);
              }
            })();
          },
        },
      ]
    );
  };

  const hardcodedPlans = [
    {
    _id: 'basic-plan', // ✅ required
    title: 'Basic Plan',
    name: 'Basic Plan', // ✅ used in redux slice
    roi: '1.5%', // ✅ make it number/string without % symbol for redux
    roiPercent: '1.5',
    minAmount: '500',
    amount: '500', // ✅ fallback
    duration: '3',
    durationDays: '3',
    payout: 'Daily',
    payoutType: 'Daily',
    borderColor: '#34A853',
    logo: require('../../assests/basicplanlogo.png'),
    image: require('../../assests/card1.png'),
    },
    { _id: 'Gold-plan',
      title: 'Gold Plan',
      name: 'Gold Plan',
      roi: '2.5 Daily',
      minAmount: '2000',
      amount: '2000', 
      duration: '7 Days',
      payoutType: 'Weekly',
      borderColor: '#FDBE00',
      logo: require('../../assests/goldplanlogo.png'),
      image: require('../../assests/premiumplanImage.png'),
    },
    { _id: 'Premium-plan',
      title: 'Premium Plan',
      name: 'Premium Plan',
      roi: '4.0 Daily',
      minAmount: '5000',
      amount: '5000', 
      duration: '7 Days',
      payoutType: 'Monthly',
      borderColor: '#9747FF',
      logo: require('../../assests/premiumplanlogo.png'),
      image: require('../../assests/goldplanimage.png'),
    },
  ];

  return (
    <>
      <StatusBar
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        translucent
      />
      <SafeAreaView style={styles.safeArea}>
        {loading ? (
          <Loader visible={loading} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <AdminTemplateHeaderPart
              name="Investment Plans Management"
              paddingBottom={10}
            />

            <View style={styles.container}>
              <View style={styles.cardList}>
                {/* ✅ Hardcoded Plans */}
                {hardcodedPlans.map((plan, index) => (
                  <PlanCard
                    key={`hardcoded-${index}`}
                    title={plan.title}
                    roi={plan.roi}
                    amount={`$${plan.minAmount}`}
                    duration={plan.duration}
                    payout={plan.payoutType}
                    borderColor={plan.borderColor}
                    editButtonColor={plan.borderColor}
                    logo={plan.logo}
                    image={plan.image}
                    onEditPress={() =>
                      handleEdit(plan, plan.borderColor)
                    }
                  />
                ))}

                {/* ✅ Dynamic Plans from API */}
                {investmentPlans?.map((plan, index) => {
                  const hardcodedTitles = hardcodedPlans.map(p =>
                    p.title.trim().toLowerCase()
                  );
                  const isDuplicate = hardcodedTitles.includes(
                    plan.title?.trim().toLowerCase()
                  );
                  if (isDuplicate) return null;

                  const dynamicColor = '#666';

                  return (
                    <PlanCard
                      key={`dynamic-${plan._id || index}`}
                      title={plan?.name || 'N/A'} // ✅ plan.name is correct
                      roi={`${plan?.roiPercent || 'N/A'}%`} // ✅ corrected
                      amount={`$${plan?.minAmount || 'N/A'}`} // ✅ already correct
                      duration={`${plan?.durationDays || 'N/A'} days`} // ✅ corrected
                      payout={plan?.autoPayout ? 'Yes' : 'No'} // ✅ corrected
                      borderColor={dynamicColor}
                      editButtonColor={dynamicColor}
                      onEditPress={() => handleEdit(plan, dynamicColor)}
                      onDeletePress={() => handleDelete(plan._id)}
                    />

                  );
                })}

                {/* ✅ Add New Plan Button */}
                <PlanCard
                  title={'New Plan'}
                  roi={''}
                  amount={''}
                  duration={''}
                  payout={''}
                  borderColor="#978686"
                  editButtonColor="#978686"
                  editButtonText="Add Plan"
                  onEditPress={() =>
                    handleEdit(
                      {
                        title: 'New Plan',
                        roi: '',
                        minAmount: '',
                        duration: '',
                        payoutType: '',
                      },
                      '#978686',
                      'add'
                    )
                  }
                />
              </View>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </>
  );
};

export default InvestmentPlans;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  container: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  cardList: {
    flexDirection: 'column',
    marginBottom: 10,
    marginTop: 10,
  },
});
