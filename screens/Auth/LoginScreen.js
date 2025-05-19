import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Feather from 'react-native-vector-icons/dist/Feather';
const LoginScreen = () => {
    return (
        <>
            <StatusBar barStyle={"dark-content"} backgroundColor={'#fff'} />
            <SafeAreaView style={styles.mainContainer}>
                <View style={styles.imageView}>
                    <Image source={require('../images/Coins.png')}
                        resizeMode='cover'
                        style={styles.imageCoins1}
                    />
                    <Image source={require('../images/Coins.png')}
                        resizeMode='cover'
                        style={styles.imageCoins}
                    />
                </View>
                <View style={styles.headerStyle}>
                    <Ionicons name={'arrow-back'} size={25} color={'#fff'} />
                    <Text style={styles.loginText}>Login</Text>
                    <TouchableOpacity style={styles.createNewAccount}>
                        <Text style={styles.createText}>Create New Account</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.mainContent}>
                    <Text style={styles.welcomeText}>
                        Welcome Back
                    </Text>
                    <Text style={styles.label}>E-mail Address</Text>
                    <View style={styles.inputField}>
                        <TextInput style={styles.input} />
                    </View>
                    <Text style={styles.label}>Password</Text>
                    <View style={[styles.inputField, { flexDirection: "row" }]}>
                        <TextInput style={styles.input} />
                        <Feather name='eye' size={20} color={'#000'} style={styles.iconStyle} />
                    </View>
                    <Text style={styles.forgateText}>Forget Password?</Text>
                    <TouchableOpacity
                        style={styles.loginBtn}
                    >
                        <Text style={styles.loginBtnText}>Log in</Text>
                    </TouchableOpacity>

                    <Text style={styles.OrText}>Or</Text>
                    <Text style={styles.loginWith}>Log in with</Text>
                    <View style={styles.logos}>

                    </View>
                </View>

            </SafeAreaView>
        </>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#34A853'
    },
    imageView: {
        flexDirection: "row",
        // top:10
    },
    imageCoins: {
        width: 200,
        height: 250,
        // top: 10,
        left: -55,
        bottom: 23,

    },
    imageCoins1: {
        height: 200,
        // top: 10,
        left: -35,
        transform: [{ rotate: '-90deg' }]
    },
    headerStyle: {
        position: 'absolute',
        top: 80,
        // zIndex:1000,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        padding: 5,
    },
    loginText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: "500",

    },
    createNewAccount: {
        // width: '80%',
        height: 30,
        // top: 121,
        left: 150,
        borderRadius: 4,
        gap: 10,
        backgroundColor: '#FF8800',
        paddingHorizontal: 10,
        justifyContent: "center",
        elevation: 2,
    },
    createText: {
        fontFamily: 'Poppins',
        fontWeight: "400",
        fontSize: 12,
        lineHeight: 28,
        textAlign: 'center',
        color: '#fff'

    },
    mainContent: {
        width: '100%',
        height: 792,
        // top: 225,
        backgroundColor: '#fff',
        borderRadius: 30

    },
    welcomeText: {
        fontFamily: "Poppins",
        width: 154,
        height: 28,
        top: 10,
        left: 30,
        fontSize: 20,
        fontWeight: '400',
        color: "#FF8800",

    },
    label: {
        top: 20,
        left: 28,
        color: "#1E1F21"

    },
    input: {
        width: 341,
        height: 40,
        top: 30,
        left: 28,
        borderRadius: 4,
        borderWidth: 0.5,

    },
    inputField: {
        height: 60,
        width: 120,

    },
    iconStyle: {
        top: 40
    },
    forgateText: {
        width: '100%',
        height: 18,
        top: 10,
        left: 260,

    },
    loginBtn: {
        width: 328,
        height: 36,
        top: 40,
        left: 42,
        borderRadius: 4,
        gap: 10,
        backgroundColor: "#34A853",
        elevation: 2,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",

    },
    loginBtnText: {
        color: "#fff"
    },
    OrText: {
        width: 15,
        height: 40,
        top: 60,
        left: 199,
        color: "#000"

    },
    loginWith: {
        width: '100%',
        height: 28,
        top: 60,
        left: 173,

    },
    logos:{
        flexDirection:"row"
    }

})