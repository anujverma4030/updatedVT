import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Dimensions, Image, Alert } from 'react-native'
import React from 'react'
import SignInLoginHeadPart from '../components/SignInLoginHeadPart';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';


const SignUpScreen = () => {
    const { height, width } = Dimensions.get('window');
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <SafeAreaView>
                <View style={styles.mainContainer}>
                    <View>
                        <Image
                            source={require('../../../assests/loginSiginBacckgroundImage.png')}
                            style={styles.image}
                        />
                    </View>
                    <View>
                        <Image
                            style={[styles.image, { top: height * -0.45 }]}
                            source={require("../../../assests/leftCoins.png")}
                        />
                        <Image
                            style={[styles.image, { top: height * -0.75, left: width * 0.4 }]}
                            source={require("../../../assests/rightCoins.png")}
                        />
                    </View>
                    <View style={[styles.loginAndCreateAccountContainer, { top: height * 0.09 }]}>
                        <View style={styles.loginArrowBackContain}>
                            <TouchableOpacity
                                onPress={() =>navigation.goBack()}

                            >
                                <Icon style={styles.BackIcon} name='arrow-back' size={20} color="#000000" />
                            </TouchableOpacity>
                            <Text style={styles.loginText}>Sign Up</Text>
                        </View>
                        <View style={styles.loginArrowBackContain}>
                            <TouchableOpacity 
                            
                            
                            style={styles.createAccountButton}>
                                <Text style={styles.createNewText}>Create New Account</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
            <View style={styles.body}>
                <Text style={styles.welcomeText}>WelCome!</Text>

                <Text style={styles.label}>E-Mail Address / Phone Number</Text>
                <TextInput style={styles.input} />

                <Text style={styles.label}>OTP</Text>
                <View style={styles.passwordContainer}>
                    <TextInput style={styles.inputPassword} />
                    <TouchableOpacity>
                        <Icon
                            style={[styles.icon, { right: width * 0.01, top: height * 0.008 }]}
                            name="visibility"
                            size={18}
                            color="#000"
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.forgotPassword}>
                    <Text style={styles.forgotPasswordText}>Forgot Password ?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Sign Up</Text>
                </TouchableOpacity>

                <Text style={styles.orText}>Or</Text>

                <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.loginWith}>Sign Up With</Text>
                    <View style={styles.divider} />
                </View>

                <View style={styles.socialIconContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Image
                            style={styles.socialIcon}
                            source={require('../../../assests/googleLogo.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Image
                            style={styles.socialIcon}
                            source={require('../../../assests/appleLogo.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Image
                            style={styles.socialIcon}
                            source={require('../../../assests/facebookLogo.png')}
                        />
                    </TouchableOpacity>
                </View>

                <Text style={styles.signUpPrompt}>
                    Already Have an Account?
                    <TouchableOpacity>
                        <Text style={styles.signInLink}> Log In</Text>
                    </TouchableOpacity>
                </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    mainContainer: {
        width: "100%",
        height: Dimensions.get("window").height * 0.35,
        position: 'relative',
    },
    image: {
        resizeMode: 'contain',
    },
    loginAndCreateAccountContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        width: "100%",
        paddingHorizontal: 20
    },
    loginArrowBackContain: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    BackIcon: {
        fontSize: RFValue(22),
        color: "#FFFFFF"
    },
    loginText: {
        fontSize: RFValue(20),
        fontWeight: 400,
        color: "#FFFFFF"
    },
    createAccountButton: {
        alignItems: 'center',
        backgroundColor: "#FF8800",
        padding: 5,
        borderRadius: 4,
        elevation: 6,
    },
    createNewText: {
        color: "#FFFFFF",
        fontSize: RFValue(9),
    },

    container: {
        // flex: 1,
        backgroundColor: '#fff',

    },
    body: {
        padding: 30,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginTop: -100
    },
    welcomeText: {
        fontSize: RFValue(20),
        fontWeight: 'bold',
        color: '#FF8800',
        marginBottom: 15,
    },
    label: {
        fontSize: RFValue(16),
        marginTop: 10,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 15
    },
    passwordContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    inputPassword: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 15,
        width: "100%"
    },
    icon: {
        position: 'absolute',
    },
    forgotPassword: {
        alignItems: 'flex-end',
        marginVertical: 5,
    },
    forgotPasswordText: {
        fontSize: RFValue(10),
        color: '#555',
    },
    loginButton: {
        backgroundColor: 'green',
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 30
    },
    loginButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: RFValue(14),
        fontWeight: 400
    },
    orText: {
        textAlign: 'center',
        marginTop: 25,
        marginBottom: 10,
        fontSize: RFValue(12),
        fontWeight: 600,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    loginWith: {
        marginHorizontal: 10,
        fontSize: RFValue(12),
        color: '#888',
    },
    socialIconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        marginTop: 20
    },
    button: {
        backgroundColor: "#E7E7E7",
        padding: 10,
        borderRadius: 7
    },
    socialIcon: {
        width: 35,
        height: 35,
        resizeMode: 'contain',
    },
    signUpPrompt: {
        marginTop: 60,
        marginBottom: 20,
        textAlign: 'center',
        fontSize: RFValue(12),
        color: '#000',
    },
    signInLink: {
        color: "green",
        fontWeight: 600
    }

});

export default SignUpScreen