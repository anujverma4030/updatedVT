import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from 'react-native';

import AdminTemplateHeaderPart from '../../components/Header/AdminTemplateHeaderPart';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllDeposits,
  toggleDepositStatus
} from '../../redux/slices/adminSlice';
import Loader from '../../components/Loader/Loader';

const columnWidths = {
  txnId: 80,
  userId: 80,
  amount: 100,
  address: 140,
  screenshot: 120,
  status: 100,
  actions: 140,
};

const DepositsScreen = () => {
  const dispatch = useDispatch();
  const { deposits, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllDeposits());
  }, [dispatch]);

const handleStatusUpdate = (item, status) => {
  if (item.status !== 'pending') {
    Alert.alert('⛔ Already Processed', `Deposit is already ${item.status}`);
    return;
  }

  dispatch(toggleDepositStatus({ id: item._id, status }))
    .unwrap()
    .then((res) => {
      console.log("🔵 Backend Response:", res);

      // ✅ Success message
      Alert.alert(
        '✅ Success',
        `Deposit ${status === 'completed' ? 'approved' : 'rejected'} successfully!`
      );

      // Thoda delay ke baad list refresh kare taaki alert ka UI disturb na ho
      setTimeout(() => {
        dispatch(fetchAllDeposits());
      }, 500);
    })
    .catch((err) => {
      console.log("❌ Error:", err);
      Alert.alert("Error", err?.message || "Something went wrong");
    });
};


  const handleScreenshotPress = (url) => {
    if (!url) {
      Alert.alert('⚠️ No Screenshot', 'No screenshot available for this deposit.');
      return;
    }
    Alert.alert('📷 Screenshot URL', url);
  };

  return (
    <>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} translucent />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        {loading ? (
          <Loader visible={loading} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <AdminTemplateHeaderPart name="Deposits" paddingBottom={20} />
            <View style={styles.container}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.HorizentalScrollContainer}
              >
                <View style={styles.TableContainer}>
                  {/* Table Header */}
                  <View style={[styles.row, styles.headerRow]}>
                    <Text style={[styles.headerCell, { width: columnWidths.txnId }]}>Txn ID</Text>
                    <Text style={[styles.headerCell, { width: columnWidths.userId }]}>User ID</Text>
                    <Text style={[styles.headerCell, { width: columnWidths.amount }]}>Amount</Text>
                    <Text style={[styles.headerCell, { width: columnWidths.address }]}>Address</Text>
                    <Text style={[styles.headerCell, { width: columnWidths.screenshot }]}>Screenshot</Text>
                    <Text style={[styles.headerCell, { width: columnWidths.status }]}>Status</Text>
                    <Text style={[styles.headerCell, { width: columnWidths.actions }]}>Actions</Text>
                  </View>

                  {/* Table Data */}
                  {deposits.map((item) => (
                    <View style={styles.row} key={item._id}>
                      {/* Txn ID */}
                      <Text style={[styles.cell, { width: columnWidths.txnId }]} numberOfLines={1}>
                        {item._id || 'N/A'}
                      </Text>

                      {/* User ID */}
                      <Text style={[styles.cell, { width: columnWidths.userId }]}>
                        {item.userId?._id || 'N/A'}
                      </Text>

                      {/* Amount */}
                      <Text style={[styles.cell, { width: columnWidths.amount }]}>
                        ₹ {item.amount || 0}
                      </Text>

                      {/* Address */}
                      <Text style={[styles.cell, { width: columnWidths.address }]}>
                        {item.address || 'N/A'}
                      </Text>

                      {/* Screenshot */}
                      <TouchableOpacity
                        onPress={() => handleScreenshotPress(item?.screenshot)}
                        style={{ width: columnWidths.screenshot }}
                      >
                        <Text style={[styles.cell, styles.screenshotLink]}>View</Text>
                      </TouchableOpacity>

                      {/* Status */}
                      <Text
                        style={[
                          styles.cell,
                          {
                            width: columnWidths.status,
                            color:
                              item.status === 'completed'
                                ? 'green'
                                : item.status === 'rejected'
                                ? 'red'
                                : '#E5A400',
                          },
                        ]}
                      >
                        {item.status}
                      </Text>

                      {/* Actions */}
                      <View style={[styles.cell, { width: columnWidths.actions, flexDirection: 'row' }]}>
                        <TouchableOpacity onPress={() => handleStatusUpdate(item, 'completed')}>
                          <Text style={styles.link}>Approve</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleStatusUpdate(item, 'rejected')}>
                          <Text style={styles.reject}>Reject</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </>
  );
};

export default DepositsScreen;

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
    color: 'black',
    paddingHorizontal: 10,
  },
  cell: {
    paddingHorizontal: 10,
    color: 'black',
  },
  link: {
    color: 'green',
    textDecorationLine: 'underline',
    marginRight: 10,
  },
  reject: {
    color: 'red',
    textDecorationLine: 'underline',
    marginLeft: 10,
  },
  screenshotLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
