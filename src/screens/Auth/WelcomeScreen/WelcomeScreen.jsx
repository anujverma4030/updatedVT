import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
    const navigation = useNavigation();
    const { height } = Dimensions.get('window');
    return (
        
            <SafeAreaView>
                <View style={styles.mainContainer}>
                    <Image
                        source={require('../../../assests/welcome.png')}
                        style={styles.image}
                    />
                    <View style={[styles.overlay, { top: height * 0.05 }]}>

                        <Text style={styles.welcomeText}>Welcome to the Spin &{'\n'} Win Adventure!</Text>
                        <Text style={styles.spinTheWheelText}>Spin the wheel, invite friends, and unlock exciting rewards with every turn!</Text>
                    </View>
                    <View style={[styles.spinImageOverlay, { top: height * 0.17 }]}>
                        <Image
                            style={styles.spinImage}
                            source={require('../../../assests/WelcomeSpin.png')}
                            resizeMode='contain'
                            
                        />
                    </View>
                </View>
                <View style={[styles.buttonContainer, { top: 630 }]}>
                    <View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate('SignUpScreen')}
                            style={styles.button}>
                            <Text style={styles.signupText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate('LoginScreen')}
                            style={styles.loginbutton}>
                            <Text style={styles.loginText}>Log In</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.policy}>
                        <Text style={styles.agreePolicyText}>
                            By clicking Login or Signup, you agree to our
                            <Text style={styles.linkText}> Privacy Policy </Text>{"\n"}
                            And
                            <Text style={styles.linkText}> Terms of Services</Text>.
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
     

    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // backgroundColor: 'white',
    },
    image: {
        resizeMode: 'contain',
        width:'100%'
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: RFValue(24, 600),
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    },
    spinTheWheelText: {
        color: 'white',
        fontSize: 9,
    },
    spinImageOverlay: {
        position: 'absolute',
        // justifyContent:'center',
        alignSelf:'center',
    },
    spinImage: {
        width:400,
        height:550
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
        elevation: 4,

    },
    loginbutton: {
        alignItems: 'center',
        backgroundColor: "#fff",
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 10,
        marginHorizontal: 25,
        borderRadius: 6,
        elevation: 4,
    },
    signupText: {
        fontSize: RFValue(14),
        fontWeight: 400,
        color: "white",
        textAlign: 'center'
    },
    loginText: {
        fontSize: RFValue(14),
        color:'black',
        fontWeight:400,
    },
    agreePolicyText: {
        fontSize: RFValue(10),
        textAlign: 'center',
        color:"#34A853"
    },
    linkText: {
        color: "#34A853"
    },
    policy:{
        marginTop:20
    }

})