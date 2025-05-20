import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import React from 'react'

export default function WelcomeScreen() {
    const { height } = Dimensions.get('window');
    return (
        <View>
            <SafeAreaView>
                <View style={styles.mainContainer}>
                    <Image
                        source={require('../assests/welcome.png')}
                        style={styles.image}
                    />
                    <View style={[styles.overlay, { top: height * 0.05 }]}>

                        <Text style={styles.welcomeText}>Welcome to the Spin &{'\n'} Win Adventure!</Text>
                        <Text style={styles.spinTheWheelText}>Spin the wheel, invite friends, and unlock exciting rewards with every turn!</Text>
                    </View>
                    <View style={[styles.spinImageOverlay, { top: height * 0.16 }]}>
                        <Image
                            style={styles.spinImage}
                            source={require('../assests/welcom@spin.png')}
                        />
                    </View>
                </View>
                <View style={[styles.buttonContainer, { top: height * 0.82 }]}>
                    <View>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.signupText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.loginbutton}>
                            <Text style={styles.loginText}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.agreePolicyText}>
                            By clicking Login or Signup, you agree to our
                            <Text style={styles.linkText}> Privacy Policy </Text>{"\n"}
                            And
                            <Text style={styles.linkText}> Terms of Services</Text>.
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        </View >

    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        resizeMode: 'contain'
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: RFValue(24, 600),
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    spinTheWheelText: {
        color: 'white',
        fontSize: 8,
    },
    spinImageOverlay: {
        position: 'absolute',
    },
    spinImage: {
        resizeMode: 'contain'
    },

    buttonContainer: {
        position: "relative",
        display: "flex",
        gap: 15
    },
    button: {
        alignItems: 'center',
        backgroundColor: "#FF8800",
        padding: 10,
        marginHorizontal: 25,
        borderRadius: 6,
        elevation: 5,

    },
    loginbutton: {
        alignItems: 'center',
        backgroundColor: "#fff",
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        marginHorizontal: 25,
        borderRadius: 6,
        elevation: 5,
    },
    signupText: {
        fontSize: RFValue(14),
        fontWeight: 400,
        color: "white",
        textAlign: 'center'
    },
    loginText: {
        fontSize: RFValue(14),
    },
    agreePolicyText: {
        fontSize: RFValue(10),
        textAlign: 'center'
    },
    linkText: {
        color: "#34A853"
    }

})