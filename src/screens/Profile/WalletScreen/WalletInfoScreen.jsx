import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getWalletBalance } from '../../../redux/slices/walletSlice';
import { fetchRewardInfo } from '../../../redux/slices/rewardSlice';
import { fetchReferralSummary } from '../../../redux/slices/referralSlice';
import Loader from '../../../components/Loader/Loader';

const WalletInfoScreen = () => {
  const navigation = useNavigation();
  const { height, width } = Dimensions.get('window');
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const { wallet, loading } = useSelector((state) => state.wallet);
  const { rewardBalance, spinBalance, referralBalance } = useSelector((state) => state.reward);
  const walletFetched = useRef(false);

  useEffect(() => {
    if (!walletFetched.current) {
      dispatch(getWalletBalance());
      dispatch(fetchRewardInfo());
      dispatch(fetchReferralSummary());
      walletFetched.current = true;
    }
  }, [dispatch]);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      {loading ? (
        <Loader visible={loading} />
      ) : (
        <SafeAreaView style={styles.MainContainer}>
          <ScrollView>
            {/* Header */}
            <View style={styles.headerContentContainer}>
              <View style={styles.headerTextContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon name="arrow-back" size={20} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Wallet Info</Text>
              </View>
              <TouchableOpacity>
                <Icon name="settings" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Withdrawals */}
            <View style={styles.depositAndWithdrawContainer}>
              <TouchableOpacity style={[styles.depositTextBox, { backgroundColor: '#FDBE00', borderTopLeftRadius: 6, borderBottomLeftRadius: 6 }]}>
                <Text style={styles.depositText}>Pending Withdrawals $100 (processing)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.depositTextBox, { backgroundColor: '#2E7D32', borderTopRightRadius: 6, borderBottomRightRadius: 6 }]}>
                <Text style={styles.depositText}>
                  Total Withdrawn{'\n'}
                  <Text>$1,150</Text>
                </Text>
              </TouchableOpacity>
            </View>

            {/* Wallet Info */}
            <Text style={{ fontSize: RFValue(20), marginLeft: 20, color: 'black' }}>Wallet</Text>

            <View style={styles.card}>
              <View style={styles.cardTextContainer}>
                {[
                  { label: 'Main Balance', value: wallet?.balance },
                  { label: 'Locked Balance', value: wallet?.lockedBalance },
                  { label: 'Commission', value: wallet?.commission },
                  { label: 'Spin Balance', value: spinBalance },
                  { label: 'Reward Balance', value: rewardBalance },
                  { label: 'Referral Earnings', value: referralBalance },
                ].map(({ label, value }) => (
                  <View style={styles.rowBetween} key={label}>
                    <Text style={styles.label}>{label}</Text>
                    <Text style={styles.value}>${Number(value ?? 0).toFixed(2)}</Text>
                  </View>
                ))}

                <View style={styles.rowBetween}>
                  <Text style={styles.label}>Binance Wallet</Text>
                  <Text style={styles.value}>0x****1234</Text>
                </View>

                <View style={styles.rowBetweenColumnRight}>
                  <Text style={styles.label}>Bonus Cash</Text>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.value}>$50</Text>
                    <Text style={styles.expiryText}>(expires on 2025-05-01)</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.Button} onPress={() => setModalVisible(true)}>
                <Text style={styles.ButtonText}>Add/Update Wallet</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Modal for Manage Wallet Options */}
          <Modal
            visible={modalVisible}
            animationType="fade"
            transparent
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalBox}>
                <Text style={styles.modalTitle}>Manage Wallet</Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('UserDeposit');
                  }}
                >
                  <Text style={styles.modalButtonText}>Add Balance Request</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate('UserWithdraw');
                  }}
                >
                  <Text style={styles.modalButtonText}>Withdraw Request</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={[styles.modalButtonText, { color: '#000' }]}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      )}
    </>
  );
};

export default WalletInfoScreen;

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
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  headerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerText: {
    fontSize: RFValue(20),
    fontWeight: '500',
    color: '#fff',
  },
  depositAndWithdrawContainer: {
    width: '80%',
    margin: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  depositTextBox: {
    width: '50%',
    paddingVertical: 20,
  },
  depositText: {
    fontSize: RFValue(13),
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 6,
    padding: 20,
    margin: 20,
    marginTop: 30,
  },
  cardTextContainer: {
    gap: 2,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  rowBetweenColumnRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  label: {
    fontSize: RFValue(14),
    color: '#2E7D32',
    fontWeight: '400',
  },
  value: {
    fontSize: RFValue(11),
    color: 'black',
    fontWeight: '500',
  },
  expiryText: {
    fontSize: RFValue(10),
    color: '#888',
    marginTop: 2,
  },
  Button: {
    backgroundColor: '#FF8800',
    padding: 5,
    marginTop: 15,
    borderRadius: 4,
  },
  ButtonText: {
    fontSize: RFValue(10),
    textAlign: 'center',
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalBox: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 8,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: RFValue(16),
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
    color:'black'
  },
  modalButton: {
    backgroundColor: '#34A853',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 6,
  },
  modalButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: RFValue(13),
    fontWeight: '500',
  },
});
