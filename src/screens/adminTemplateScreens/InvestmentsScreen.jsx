import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import AdminTemplateHeaderPart from '../../components/Header/AdminTemplateHeaderPart';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInvestments } from '../../redux/slices/adminSlice';
import Loader from '../../components/Loader/Loader';
import moment from 'moment';

const columnWidths = {
  userId: 80,
  planName: 100,
  amount: 100,
  roi: 100,
  status: 100,
  date: 100,
};

const InvestmentsScreen = () => {
  const dispatch = useDispatch();
  const { userInvestments, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchUserInvestments());
  }, [dispatch]);

  useEffect(() => {
    if (userInvestments && Array.isArray(userInvestments)) {
      // Alert.alert('USER INVESTMENTS', JSON.stringify(userInvestments, null, 2));
    }
  }, [userInvestments]);

  const getPlanValue = (plandObj, key) => {
    if (plandObj && typeof plandObj === 'object' && plandObj[key]) {
      return plandObj[key];
    }
    return 'N/A';
  };

  return (
    <>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} translucent />
      {loading ? (
        <Loader visible={loading} />
      ) : (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          <ScrollView>
            <AdminTemplateHeaderPart name="User Investments" paddingBottom={20} />
            <View style={styles.container}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.HorizentalScrollContainer}
              >
                <View style={styles.TableContainer}>
                  <View style={[styles.row, styles.headerRow]}>
                    <Text style={[styles.headerCell, { width: columnWidths.userId }]}>User ID</Text>
                    <Text style={[styles.headerCell, { width: columnWidths.planName }]}>Plan Name</Text>
                    <Text style={[styles.headerCell, { width: columnWidths.amount }]}>Amount</Text>
                    <Text style={[styles.headerCell, { width: columnWidths.roi }]}>R.O.I</Text>
                    <Text style={[styles.headerCell, { width: columnWidths.status }]}>Status</Text>
                    <Text style={[styles.headerCell, { width: columnWidths.date }]}>Dates</Text>
                  </View>

                  {(Array.isArray(userInvestments) ? userInvestments : []).map((item, index) => (
                    <View style={styles.row} key={index}>
                      <Text style={[styles.cell, { width: columnWidths.userId }]}>
                        {item?.userId || 'N/A'}
                      </Text>
                      <Text style={[styles.cell, { width: columnWidths.planName }]}>
                        {getPlanValue(item.planId, 'name')}
                      </Text>
                      <Text style={[styles.cell, { width: columnWidths.amount }]}>
                        ₹{item?.amount ?? 'N/A'}
                      </Text>
                      <Text style={[styles.cell, { width: columnWidths.roi }]}>
                        {getPlanValue(item.planId, 'roiPercent')}%
                      </Text>
                      <Text style={[styles.cell, { width: columnWidths.status }]}>
                        {item?.status?.charAt(0).toUpperCase() + item.status.slice(1) || 'N/A'}
                      </Text>
                      <Text style={[styles.cell, { width: columnWidths.date }]}>
                        {item?.startDate ? moment(item.startDate).format('MMM DD, YYYY') : 'N/A'}
                      </Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default InvestmentsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#F3F3F3',
    margin: 10,
    borderRadius: 6,
  },
  HorizentalScrollContainer: {
    backgroundColor: '#fff',
  },
  TableContainer: {},
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  headerRow: {
    backgroundColor: '#4CAF50',
  },
  headerCell: {
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 10,
  },
  cell: {
    paddingHorizontal: 10,
    color:'black'
  },
});
