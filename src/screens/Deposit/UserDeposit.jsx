import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const UserDeposit = () => {
  const navigation = useNavigation();
  const { userDetails } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    amount: '',
    name: '',
    txnId: '',
    walletAddress: '',
    datetime: '',
    paymentMethod: '',
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSelectMethod = (methodName) => {
    setFormData({ ...formData, paymentMethod: methodName });
  };

  const paymentOptions = [
    {
      name: 'Bank',
      image: require('../../assests/NotoBank.png'),
    },
    {
      name: 'UPI',
      image: require('../../assests/UPI.png'),
    },
    {
      name: 'Crypto',
      image: require('../../assests/Crypto.png'),
    },
  ];

  const handleProceed = () => {
    const { amount, name, txnId, walletAddress, datetime, paymentMethod } = formData;

    if (!amount || !name || !txnId || !walletAddress || !datetime || !paymentMethod) {
      Alert.alert('Error', 'Please fill all the fields and select a payment method.');
      return;
    }

    // TODO: Add your API logic here
    console.log('Sending data to backend:', formData);
    Alert.alert('Success', 'Your deposit request is being processed.');
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.mainContainer}>
        <ScrollView>
          <View style={styles.headerContainer}>
            <View style={styles.headerIcons}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialIcons name="arrow-back" size={30} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons name="notifications" size={30} color="#fff" />
              </TouchableOpacity>
            </View>
            <Text style={styles.headerText}>
              Hi {userDetails?.name || 'User'}, add funds to your wallet securely.
            </Text>
            <View style={styles.headerIcons}>
              <Text style={styles.balanceText}>
                Balance: ${userDetails?.wallet?.balance || '0'}
              </Text>
            </View>
          </View>

          <View style={styles.withdrawalContainer}>
            <View style={styles.withdrawView}>
              <Text style={styles.withdrawalHeaderText}>Deposit</Text>

              {/* All inputs together */}
              <TextInput
                placeholder="Enter Amount"
                placeholderTextColor="black"
                value={formData.amount}
                onChangeText={(text) => handleChange('amount', text)}
                keyboardType="numeric"
                style={styles.modalInput}
              />
              <TextInput
                placeholder="Your Name"
                placeholderTextColor="black"
                value={formData.name}
                onChangeText={(text) => handleChange('name', text)}
                style={styles.modalInput}
              />
              <TextInput
                placeholder="Transaction ID"
                placeholderTextColor="black"
                value={formData.txnId}
                onChangeText={(text) => handleChange('txnId', text)}
                style={styles.modalInput}
              />
              <TextInput
                placeholder="Wallet Address"
                placeholderTextColor="black"
                value={formData.walletAddress}
                onChangeText={(text) => handleChange('walletAddress', text)}
                style={styles.modalInput}
              />
              <TextInput
                placeholder="Date & Time"
                placeholderTextColor="black"
                value={formData.datetime}
                onChangeText={(text) => handleChange('datetime', text)}
                style={styles.modalInput}
              />

              <Text style={styles.labelText}>Choose a payment method</Text>

              <View style={styles.paymentOption}>
                {paymentOptions.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleSelectMethod(item.name)}
                    style={[
                      styles.optionCard,
                      formData.paymentMethod === item.name && { borderColor: '#34A853', borderWidth: 2 },
                    ]}
                    activeOpacity={0.7}
                  >
                    <Image source={item.image} style={styles.image} />
                    <Text style={styles.text}>{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity style={styles.otpBtn} onPress={handleProceed} activeOpacity={0.7}>
                <Text style={styles.otpBtnText}>Proceed</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default UserDeposit;

const styles = StyleSheet.create({
  mainContainer: { flex: 1, gap: 30 },
  headerContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#34A853',
    paddingTop: 30,
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
  headerText: {
    textAlign: 'left',
    fontWeight: '400',
    fontSize: 15,
    marginLeft: 20,
    color: '#fff',
    marginTop: 10,
  },
  balanceText: {
    fontWeight: '400',
    fontSize: 24,
    color: '#F0F5F5',
    marginLeft: 5,
  },
  withdrawalContainer: {
    alignItems: 'center',
  },
  withdrawView: {
    width: '90%',
    backgroundColor: '#fff',
    elevation: 4,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    gap: 10,
    marginTop: 40,
    marginBottom: 20,
  },
  withdrawalHeaderText: {
    fontWeight: '500',
    fontSize: 20,
    color: '#1E3D3D',
    alignSelf: 'flex-start',
  },
  labelText: {
    alignSelf: 'flex-start',
    marginLeft: 16,
    marginTop: 20,
    fontSize: 13,
    fontWeight: '500',
    color: '#000000',
  },
  paymentOption: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#fff',
  },
  optionCard: {
    alignItems: 'center',
    padding: 5,
    marginHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 2,
    flexDirection: 'row',
    width: '28%',
    height: 40,
    justifyContent: 'space-evenly',
    borderColor: '#00000036',
    borderWidth: 1,
  },
  image: {
    width: 28,
    height: 27,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  otpBtn: {
    backgroundColor: '#FF8800',
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    marginTop: 20,
    borderRadius: 6,
    elevation: 2,
  },
  otpBtnText: {
    color: '#F0F5F5',
    fontWeight: '500',
    fontSize: 15,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
    height: 40,
    width: '90%',
    color: 'black',
  },
});
