import { ImageBackground, StatusBar, StyleSheet, Text, useWindowDimensions, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


const WelcomeScreen = () => {
    const { width, height } = useWindowDimensions();
    return (
        <ImageBackground
            source={require('../images/WelcomeImage.png')}
            resizeMode='cover'
            style={styles.bgImage}
        >
            <SafeAreaView style={styles.mainContainer}>
                <StatusBar barStyle={"dark-content"} backgroundColor={'#fff'} />
                {/* <ScrollView contentContainerStyle={{alignItems:"center",flexGrow:1}} */}
                {/* showsVerticalScrollIndicator={false}
                > */}
                <View style={styles.welomeTextView}>
                    <Text style={styles.welcomeText}>WELCOME TO THE SPIN & WIN ADVENTURE</Text>
                    <Text style={styles.spinText}>Spin the wheel, invite friends, and unlock exciting rewards with every turn!</Text>
                </View>
                <View>
                    <Image source={require('../images/15501.png')}
                        resizeMode="contain"
                        style={styles.imageStyle}
                    />
                </View>
                {/* </ScrollView> */}
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, { backgroundColor: "#fff" }]}>
                    <Text style={[styles.btnText, { color: '#000' }]}>Log In</Text>
                </TouchableOpacity>
                <View style={styles.privacyTerms}>
                    <Text style={styles.privacyTermsText}>By clicking Login or Signup, you agree to our Privacy Policy and terms of services.</Text>
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    bgImage: {
        width: '100%',
        height: 600,
        bottom: 50

    },
    mainContainer: {
        flex: 1,
        // alignItems: 'center',
    },
    welomeTextView: {
        width: 343,
        height: 56,
        top: 80,
        left: 35,
    },
    welcomeText: {
        fontFamily: "Poppins",
        fontWeight: '600',
        fontSize: 24,
        lineHeight: 28,
        // letterSpacing: 1%,
        textAlign: 'center',
        verticalAlign: 'middle',
        textTransform: 'uppercase',
        color: '#FFFFFF'

    },
    spinText: {
        fontFamily: 'Poppins',
        fontWeight: '300',
        fontSize: 8,
        lineHeight: 16,
        color: '#FFFFFF',
        textAlign: 'center',

    },
    imageStyle: {
        width: 415,
        height: 566,
        top: 120,
        // left: -187,
        // rotation: 180,
    },
    btn: {
        width: 380,
        height: 39,
        top: 80,
        left: 13,
        borderRadius: 4,
        paddingTop: 5,
        paddingRight: 163,
        paddingBottom: 5,
        paddingLeft: 163,
        gap: 10,
        backgroundColor: '#FF8800',
        elevation: 2,
        margin: 5,
        alignItems: "center",

    },
    btnText: {
        fontFamily: 'Poppins',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 28,
        textAlign: 'center',
        color: "#fff"
    },
    privacyTerms: {
        width: 320,
        height: 30,
        top: 86,
        left: 46,
    },
    privacyTermsText: {
        fontFamily: 'Poppins',
        fontWeight: 400,
        fontSize: 10,
        lineHeight: 15,
        textAlign: 'center',

    }
})