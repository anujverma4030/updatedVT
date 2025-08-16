import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllWithdrawals, approveWithdrawal } from '../../redux/slices/adminSlice';
import AdminTemplateHeaderPart from '../../components/Header/AdminTemplateHeaderPart';
import Loader from '../../components/Loader/Loader';

const columnWidths = {
  REQId: 100,
  userId: 80,
  amount: 100,
  address: 200, // Added new column width for address
  RequestTime: 120,
  status: 100,
  actions: 100,
};

const WithdrawalsScreen = () => {
  const dispatch = useDispatch();
  const { withdrawals, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllWithdrawals());
  }, [dispatch]);

  const handleApprove = (item) => {
    if (item.status === 'pending') {
      dispatch(approveWithdrawal({ id: item._id, status: 'completed' }))
        .unwrap()
        .then(() => {
          Alert.alert('✅ Success', 'Withdrawal approved.');
          dispatch(fetchAllWithdrawals());
        })
        .catch((err) => {
          const errorMessage =
            err?.response?.data?.message ||
            err?.message ||
            'Something went wrong';
          Alert.alert('❌ Error', errorMessage);
        });
    }
  };

  return (
    <>
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" translucent />
      {loading ? (
        <Loader visible={loading} />
      ) : (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          <ScrollView>
            <AdminTemplateHeaderPart name="Withdrawals" paddingBottom={20} />
            <View style={styles.container}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.HorizentalScrollContainer}
              >
                <View style={styles.TableContainer}>
                  {/* Header */}
                  <View style={[styles.row, styles.headerRow]}>
                    <Text style={[styles.headerCell, { width: columnWidths.REQId }]}>Request ID</Text>
                    <Text style={[styles.headerCell, { width: columnWidths.userId }]}>User ID</Text>
                    <Text style={[styles.headerCell, { width: columnWidths.amount }]}>Amount</Text>
                    <Text style={[styles.headerCell, { width: columnWidths.address }]}>Address</Text>
                    <Text style={[styles.headerCell, { width: columnWidths.RequestTime }]}>Request Time</Text>
                    <Text style={[styles.headerCell, { width: columnWidths.status }]}>Status</Text>
                    <Text style={[styles.headerCell, { width: columnWidths.actions }]}>Actions</Text>
                  </View>

                  {/* Rows */}
                  {withdrawals.map((item, index) => (
                    <View style={styles.row} key={index}>
                      <Text style={[styles.cell, { width: columnWidths.REQId }]}>{item._id}</Text>
                      <Text style={[styles.cell, { width: columnWidths.userId }]}>
                        {item.userId?._id || 'N/A'}
                      </Text>
                      <Text style={[styles.cell, { width: columnWidths.amount }]}>₹{item.amount}</Text>

                      {/* Withdrawal Address */}
                      <Text style={[styles.cell, { width: columnWidths.address }]}>
                        {item.address || 'N/A'}
                      </Text>

                      <Text
                        style={[
                          styles.cell,
                          {
                            width: columnWidths.RequestTime,
                            color: 'blue',
                            textDecorationLine: 'underline',
                          },
                        ]}
                      >
                        {new Date(item.createdAt).toLocaleDateString('en-GB')}
                      </Text>
                      <Text
                        style={[
                          styles.cell,
                          {
                            width: columnWidths.status,
                            color: item.status === 'completed' ? 'green' : '#E5A400',
                          },
                        ]}
                      >
                        {item.status?.charAt(0).toUpperCase() + item.status.slice(1)}
                      </Text>
                      <View
                        style={[
                          styles.cell,
                          {
                            width: columnWidths.actions,
                            flexDirection: 'row',
                          },
                        ]}
                      >
                        <TouchableOpacity
                          disabled={item.status === 'completed'}
                          onPress={() => handleApprove(item)}
                        >
                          <Text
                            style={[
                              styles.link,
                              {
                                color: item.status === 'completed' ? 'gray' : 'green',
                              },
                            ]}
                          >
                            {item.status === 'completed' ? 'Approved' : 'Approve'}
                          </Text>
                        </TouchableOpacity>
                      </View>
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

export default WithdrawalsScreen;

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
    color: 'black',
  },
  link: {
    color: 'blue',
    marginRight: 10,
    textDecorationLine: 'underline',
  },
});
