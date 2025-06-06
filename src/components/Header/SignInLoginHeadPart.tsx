import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const SignUpLoginHeadPart = () => {
    const { height, width } = Dimensions.get('window');
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <View style={styles.mainContainer}>
                <View>
                    <Image
                        source={require('../../assests/loginSiginBacckgroundImage.png')}
                        style={styles.image}
                    />
                </View>
                <View>
                    <Image
                        style={[styles.image, { top: height * -0.45 }]}
                        source={require("../../assests/leftCoins.png")}
                    />
                    <Image
                        style={[styles.image, { top: height * -0.75, left: width * 0.4 }]}
                        source={require("../../assests/rightCoins.png")}
                    />
                </View>
                <View style={[styles.loginAndCreateAccountContainer, { top: height * 0.09 }]}>
                    <View style={styles.loginArrowBackContain}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                        >
                            <Icon style={styles.icon} name='arrow-back' size={20} color="#000000" />
                        </TouchableOpacity>
                        <Text style={styles.loginText}>Log In</Text>
                    </View>
                    <View style={styles.loginArrowBackContain}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignUpScreen')}
                            style={styles.createAccountButton}>
                            <Text style={styles.createNewText}>Create New Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        paddingHorizontal: 10
    },
    loginArrowBackContain: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    icon: {
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
    }
})
export default SignUpLoginHeadPart