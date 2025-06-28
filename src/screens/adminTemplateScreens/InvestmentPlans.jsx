import { ScrollView, StatusBar, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import AdminTemplateHeaderPart from '../../components/Header/AdminTemplateHeaderPart';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchAllInvestmentPlans, setSelectedPlan } from '../../redux/slices/adminSlice';
import PlanCard from '../../components/planCard/PlanCard';

const InvestmentPlans = () => {
  const { investmentPlans, loading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchAllInvestmentPlans());
  }, [dispatch]);

  const handleEdit = (plan, color, mode = 'edit') => {
    dispatch(setSelectedPlan({
      plan: {
        title: plan.title,
        roi: plan.roi,
        amount: plan.minAmount,
        duration: plan.duration,
        payout: plan.payoutType,
        color,
      },
      mode,
    }));
    navigation.navigate('EditPlan');
  };

  return (
    <>
      <StatusBar backgroundColor={'transparent'} barStyle={"dark-content"} translucent />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'space-between' }}>
        {
          loading ? (
            <Loader visible={loading} />
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <AdminTemplateHeaderPart name='Investment Plans Management' paddingBottom={10} />

              <View style={styles.container}>
                <View style={styles.cardList}>
                  {investmentPlans?.map((plan, index) => {
                    const color =
                      plan?.title === 'Basic' ? '#4CAF50' :
                      plan?.title === 'Gold' ? '#FFD700' :
                      plan?.title === 'Premium' ? '#DA70D6' : '#999';

                    return (
                      <PlanCard
                        key={index}
                        title={plan?.title || 'N/A'}
                        roi={plan?.roi || 'N/A'}
                        amount={plan?.minAmount || 'N/A'}
                        duration={plan?.duration || 'N/A'}
                        payout={plan?.payoutType || 'N/A'}
                        borderColor={color}
                        onEditPress={() => handleEdit(plan, color)}
                      />
                    );
                  })}

                  <PlanCard 
                    title={"Basic Plan"}
                    roi={"1.5% Daily"}
                    amount={"$500"}
                    duration={"3 Days"}
                    payout={"Daily"}
                    borderColor='#34A853'
                    editButtonColor='#34A853'
                    logo={require('../../assests/basicplanlogo.png')} 
                    image={require('../../assests/card1.png')}
                    onEditPress={() =>
                      handleEdit(
                        { title: 'Basic Plan', roi: '1.5% Daily', minAmount: '$500', duration: '3 Days', payoutType: 'Daily' },
                        '#34A853'
                      )
                    }
                  />

                  <PlanCard 
                    title={"Gold Plan"}
                    roi={"2.5% Daily"}
                    amount={"$2000"}
                    duration={"7 Days"}
                    payout={"weekly"}
                    borderColor='#FDBE00'
                    editButtonColor='#FDBE00'
                    logo={require('../../assests/goldplanlogo.png')}
                    image={require('../../assests/premiumplanImage.png')}
                    onEditPress={() =>
                      handleEdit(
                        { title: 'Gold Plan', roi: '2.5% Daily', minAmount: '$2000', duration: '7 Days', payoutType: 'weekly' },
                        '#FDBE00'
                      )
                    }
                  />

                  <PlanCard 
                    title={"Premium Plan"}
                    roi={"4.0% Daily"}
                    amount={"$5000"}
                    duration={"7 Days"}
                    payout={"Monthly"}
                    borderColor='#9747FF'
                    editButtonColor='#9747FF'
                    logo={require('../../assests/premiumplanlogo.png')}
                    image={require('../../assests/goldplanimage.png')}
                    onEditPress={() =>
                      handleEdit(
                        { title: 'Premium Plan', roi: '4.0% Daily', minAmount: '$5000', duration: '7 Days', payoutType: 'Monthly' },
                        '#9747FF'
                      )
                    }
                  />

                  <PlanCard 
                    title={"New Plan"}
                    roi={""}
                    amount={""}
                    duration={""}
                    payout={""}
                    borderColor='#978686'
                    editButtonColor='#978686'
                    editButtonText='Add Plan'
                    onEditPress={() =>
                      handleEdit(
                        { title: 'New Plan', roi: '', minAmount: '', duration: '', payoutType: '' },
                        '#978686',
                        'add' // 👈 Add Plan mode
                      )
                    }
                  />
                </View>
              </View>
            </ScrollView>
          )
        }
      </SafeAreaView>
    </>
  );
};

export default InvestmentPlans;

const styles = StyleSheet.create({
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
