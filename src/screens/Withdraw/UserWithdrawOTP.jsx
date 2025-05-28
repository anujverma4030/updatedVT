import { Dimensions, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
const UserWithdrawOTP = () => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputs = useRef([]);
    const navigation = useNavigation();

    const handleChange = (text, index) => {
        if (text.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        // Move to next input
        if (text && index < 3) {
            inputs.current[index + 1].focus();
        }

        // Move to previous input if text is deleted
        if (!text && index > 0) {
            inputs.current[index - 1].focus();
        }
    };
    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
            <SafeAreaView style={styles.mainContainer}>
                {/* Header Icon */}
                <View style={styles.headerIcons}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back" size={30} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.otpText}>Enter OTP</Text>
                    {/* <TouchableOpacity>
                        <MaterialIcons name="notifications" size={30} color="#000" />
                    </TouchableOpacity> */}
                </View>
                <View style={styles.otpContainer}>
                    <View style={styles.inputContainer}>
                        {otp.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={(ref) => (inputs.current[index] = ref)}
                                style={styles.input}
                                value={digit}
                                onChangeText={(text) => handleChange(text, index)}
                                keyboardType="numeric"
                                maxLength={1}
                                autoFocus={index === 0}
                            />
                        ))}
                    </View>
                    <TouchableOpacity 
                    activeOpacity={0.7}
                    style={styles.btn}>
                        <Text style={styles.btnText}>Verify & Withdraw</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    )
}

export default UserWithdrawOTP

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        gap: 30,
    },
    headerIcons: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
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
        marginTop: 10
    },
    otpText: {
        fontSize: 20,
        fontWeight: '500',
        marginLeft: 20
    },
    otpContainer: {
        alignItems: 'center',
        width: '100%',
        height: Dimensions.get('window').height * 0.37,
        justifyContent: 'space-around',
    },
    btn: {
        width: '50%',
        backgroundColor: '#FF8800',
        alignItems: 'center',
        padding: 10,
        borderRadius: 6
    },
    btnText: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 15,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        marginVertical: 20,

    },
    input: {
        width: 53,
        height: 50,
        borderWidth: 0.5,
        borderColor: '#00000036',
        textAlign: 'center',
        fontSize: 20,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        elevation: 4
    },
})