import {
    Dimensions,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    TextInput
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const UserWithdraw = () => {
    const navigation = useNavigation();
    const { userDetails } = useSelector((state) => state.user);

    const [amount, setAmount] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [date, setDate] = useState('');
    const [name, setName] = useState(userDetails?.name || '');

    const paymentOptions = [
        {
            name: 'Bank',
            image: require('../../assests/NotoBank.png'),
            onPress: () => console.log('Bank selected'),
        },
        {
            name: 'UPI',
            image: require('../../assests/UPI.png'),
            onPress: () => console.log('UPI selected'),
        },
        {
            name: 'Crypto',
            image: require('../../assests/Crypto.png'),
            onPress: () => console.log('Crypto selected'),
        }
    ];

    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} translucent />
            <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.mainContainer}>
                <ScrollView>
                    <View style={styles.headerContainer}>
                        <View style={styles.headerIcons}>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
                                <MaterialIcons name="arrow-back" size={30} color="#fff" />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7}>
                                <MaterialIcons name="notifications" size={30} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text style={styles.headerText}>
                                Hi {userDetails?.name || 'User'}, cash out your {'\n'}rewards fast and safe!"
                            </Text>
                        </View>
                        <View style={styles.headerIcons}>
                            <Text style={styles.balanceText}>
                                Balance : ${userDetails?.wallet?.balance || '0'}
                            </Text>
                            <Image
                                source={require('../../assests/WithdrawImage.png')}
                                resizeMode='cover'
                                style={styles.balanceImage}
                            />
                        </View>
                    </View>

                    <View style={styles.withdrawalContainer}>
                        <View style={styles.withdrawView}>
                            <Text style={styles.withdrawalHeaderText}>Withdrawal</Text>

                            <View style={styles.textInput}>
                                <TextInput
                                    placeholder='Enter amount ($100 min)'
                                    placeholderTextColor={'#8F8F8F'}
                                    style={styles.input}
                                    keyboardType='numeric'
                                    value={amount}
                                    onChangeText={setAmount}
                                />
                            </View>

                            <View style={styles.textInput}>
                                <TextInput
                                    placeholder='Enter wallet address'
                                    placeholderTextColor={'#8F8F8F'}
                                    style={styles.input}
                                    value={walletAddress}
                                    onChangeText={setWalletAddress}
                                />
                            </View>

                            <View style={styles.textInput}>
                                <TextInput
                                    placeholder='Enter date (e.g. 2025-07-24)'
                                    placeholderTextColor={'#8F8F8F'}
                                    style={styles.input}
                                    value={date}
                                    onChangeText={setDate}
                                />
                            </View>

                            <View style={styles.textInput}>
                                <TextInput
                                    placeholder='Your Name'
                                    placeholderTextColor={'#8F8F8F'}
                                    style={styles.input}
                                    value={name}
                                    editable={false}
                                />
                            </View>

                            <Text style={styles.labelText}>Select ((2% fee, $10 min))</Text>
                            <View style={styles.paymentOption}>
                                {paymentOptions.map((item, index) => (
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        key={index}
                                        onPress={item.onPress}
                                        style={styles.optionCard}
                                    >
                                        <Image source={item.image} resizeMode='cover' style={styles.image} />
                                        <Text style={styles.text}>{item.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => navigation.navigate('UserWithdrawalOTP')}
                                style={styles.otpBtn}
                            >
                                <Text style={styles.otpBtnText}>Send OTP</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default UserWithdraw;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        gap: 30,
    },
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
        marginTop: 10
    },
    headerText: {
        textAlign: 'left',
        fontWeight: '400',
        fontSize: 15,
        marginLeft: 20,
        color: '#fff',
        marginTop: 10
    },
    balanceText: {
        fontWeight: '400',
        fontSize: 24,
        color: '#F0F5F5',
        marginLeft: 5,
    },
    balanceImage: {
        width: 203,
        height: 169,
        bottom: 8
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
    },
    withdrawalHeaderText: {
        fontWeight: '500',
        fontSize: 20,
        color: '#1E3D3D',
        alignSelf: 'flex-start'
    },
    textInput: {
        width: '90%',
        backgroundColor: '#fff',
        elevation: 4,
        borderRadius: 6,
        borderWidth: 0.5,
        borderColor: '#00000036',
        marginTop: 8,
    },
    input: {
        marginLeft: 10,
        height: 45,
        color: '#000',
    },
    labelText: {
        alignSelf: 'flex-start',
        marginLeft: 16,
        marginTop: 20,
        fontSize: 13,
        fontWeight: '300',
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        flexDirection: 'row',
        width: '28%',
        height: 40,
        justifyContent: 'space-evenly',
        borderWidth: 0.5,
        borderColor: '#00000036'
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
        height: 40,
        marginTop: 10,
        borderRadius: 6,
        elevation: 2
    },
    otpBtnText: {
        color: '#F0F5F5',
        fontWeight: '500',
        fontSize: 15
    }
});
