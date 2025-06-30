import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';
import React, { useCallback } from 'react';
import Loader from '../../components/Loader/Loader';
import AdminTemplateHeaderPart from '../../components/Header/AdminTemplateHeaderPart';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {
  fetchAllInvestmentPlans,
  setSelectedPlan,
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
          title: plan.title,
          roi: plan.roi,
          amount: plan.minAmount,
          duration: plan.duration,
          payout: plan.payoutType,
          color,
        },
        mode,
      })
    );
    navigation.navigate('EditPlan');
  };

  const hardcodedPlans = [
    {
      title: 'Basic Plan',
      roi: '1.5% Daily',
      minAmount: '500',
      duration: '3 Days',
      payoutType: 'Daily',
      borderColor: '#34A853',
      logo: require('../../assests/basicplanlogo.png'),
      image: require('../../assests/card1.png'),
    },
    {
      title: 'Gold Plan',
      roi: '2.5% Daily',
      minAmount: '2000',
      duration: '7 Days',
      payoutType: 'Weekly',
      borderColor: '#FDBE00',
      logo: require('../../assests/goldplanlogo.png'),
      image: require('../../assests/premiumplanImage.png'),
    },
    {
      title: 'Premium Plan',
      roi: '4.0% Daily',
      minAmount: '5000',
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

                {/* ✅ Dynamic Plans from API (avoiding duplicates safely) */}
                {investmentPlans?.map((plan, index) => {
                  const hardcodedTitles = hardcodedPlans.map(p => p.title.trim().toLowerCase());
                  const isDuplicate = hardcodedTitles.includes(plan.title?.trim().toLowerCase());
                  if (isDuplicate) return null;

                  const dynamicColor = '#666';

                  return (
                    <PlanCard
                      key={`dynamic-${plan._id || index}`}
                      title={plan?.title || 'N/A'}
                      roi={`${plan?.roi || 'N/A'}%`}
                      amount={`$${plan?.minAmount || 'N/A'}`}
                      duration={plan?.duration || 'N/A'}
                      payout={plan?.payoutType || 'N/A'}
                      borderColor={dynamicColor}
                      editButtonColor={dynamicColor}
                      onEditPress={() => handleEdit(plan, dynamicColor)}
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
