import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { verifyBinanceAddress, verifyBinanceOtp } from '../redux/slices/walletSlice';
import Toast from 'react-native-toast-message';
import Clipboard from '@react-native-clipboard/clipboard'; // Correct package for bare RN

const VerifyBinanceScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [address, setAddress] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [verifiedAddress, setVerifiedAddress] = useState('');

  const showToast = (type, text1, text2 = '') => {
    Toast.show({
      type,
      text1,
      text2,
      position: 'bottom',
      visibilityTime: 3000,
    });
  };

  const handleSendOtp = async () => {
    if (!address) return showToast('error', 'Error', 'Enter your Binance Address');

    const res = await dispatch(verifyBinanceAddress({ address }));
    if (verifyBinanceAddress.fulfilled.match(res)) {
      Alert.alert('Success', 'OTP sent successfully!');
      setOtpSent(true);
    } else {
      showToast('error', 'Failed', res.payload || 'Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return showToast('error', 'Error', 'Enter OTP');

    const res = await dispatch(verifyBinanceOtp({ otp }));

    if (verifyBinanceOtp.fulfilled.match(res)) {
      const message =
        res?.payload?.message ||
        res?.payload?.data?.message ||
        'Binance Address Verified Successfully';

      const verifiedAddr =
        res?.payload?.verifiedAddress ||
        res?.payload?.data?.verifiedAddress ||
        '';

      setVerifiedAddress(verifiedAddr);
      setOtpVerified(true);

      Alert.alert('Success', message);
    } else {
      const errorMsg =
        res?.payload?.message ||
        res?.payload?.data?.message ||
        'Binance Address verification failed';

      showToast('error', 'Failed', errorMsg);
    }
  };

  const handleCopyAddress = () => {
    if (verifiedAddress) {
      Clipboard.setString(verifiedAddress);
      showToast('success', 'Copied!', 'Binance address copied to clipboard');
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.mainContainer}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View style={styles.headerContainer}>
              <View style={styles.headerIcons}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <MaterialIcons name="arrow-back" size={30} color="#fff" />
                </TouchableOpacity>
                <MaterialIcons name="verified-user" size={30} color="#fff" />
              </View>
              <Text style={styles.headerText}>
                Secure your account with OTP verification
              </Text>
            </View>

            <View style={styles.withdrawalContainer}>
              <View style={styles.withdrawView}>
                <Text style={styles.withdrawalHeaderText}>Binance Verification</Text>

                <View style={styles.textInput}>
                  <TextInput
                    placeholder="Enter your Binance Address"
                    placeholderTextColor="#8F8F8F"
                    style={styles.input}
                    value={address}
                    onChangeText={setAddress}
                    autoCapitalize="none"
                  />
                </View>

                {!otpSent ? (
                  <TouchableOpacity style={styles.otpBtn} onPress={handleSendOtp}>
                    <Text style={styles.otpBtnText}>Send OTP</Text>
                  </TouchableOpacity>
                ) : !otpVerified ? (
                  <>
                    <View style={styles.textInput}>
                      <TextInput
                        placeholder="Enter OTP"
                        placeholderTextColor="#8F8F8F"
                        style={styles.input}
                        keyboardType="numeric"
                        value={otp}
                        onChangeText={setOtp}
                      />
                    </View>
                    <TouchableOpacity style={styles.otpBtn} onPress={handleVerifyOtp}>
                      <Text style={styles.otpBtnText}>Verify OTP</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <View>
                    <Text style={{ color: 'green', fontWeight: 'bold', marginBottom: 10 }}>
                      Binance Address Verified ✅
                    </Text>
                    {verifiedAddress ? (
                      <>
                        <Text style={{ color: '#555', fontSize: 14, marginBottom: 8 }}>
                          {verifiedAddress}
                        </Text>
                        <TouchableOpacity style={styles.copyBtn} onPress={handleCopyAddress}>
                          <Text style={styles.copyBtnText}>Copy Address</Text>
                        </TouchableOpacity>
                      </>
                    ) : null}
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>

      <Toast />
    </>
  );
};

export default VerifyBinanceScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    width: '100%',
    height: 180,
    backgroundColor: '#1e88e5',
    paddingTop: 30,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  headerText: {
    fontSize: 15,
    color: '#fff',
    marginTop: 20,
    paddingBottom: 9,
  },
  withdrawalContainer: {
    alignItems: 'center',
  },
  withdrawView: {
    width: '90%',
    backgroundColor: '#fff',
    elevation: 4,
    padding: 20,
    borderRadius: 10,
    marginTop: 40,
  },
  withdrawalHeaderText: {
    fontSize: 20,
    color: '#1E3D3D',
    marginBottom: 20,
  },
  textInput: {
    width: '100%',
    backgroundColor: '#fff',
    elevation: 2,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: '#00000036',
    marginBottom: 16,
  },
  input: {
    marginLeft: 10,
    height: 45,
    color: '#000',
  },
  otpBtn: {
    backgroundColor: '#FF8800',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    borderRadius: 6,
    elevation: 2,
  },
  otpBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  copyBtn: {
    backgroundColor: '#1e88e5',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    alignItems: 'center',
  },
  copyBtnText: {
    color: '#fff',
    fontWeight: '600',
  },
});
