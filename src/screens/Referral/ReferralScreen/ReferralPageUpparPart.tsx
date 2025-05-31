import { Alert, Dimensions, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import Clipboard from '@react-native-clipboard/clipboard';
import { useSelector } from 'react-redux';

const ReferralPageUpparPart = () => {
    const insets = useSafeAreaInsets();
    const { height } = Dimensions.get('window');
    console.log(height * 0.03);
    const { referralCode, } = useSelector(state => state.referral);
    // console.log(referralCode);
    const copyToClipboardReferralCode = (itemCopy) => {
        Clipboard.setString(itemCopy);
        Alert.alert('Alert', 'Referral code copied to clipboard');
    };
    return (
        <SafeAreaView style={styles.MainContainer}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={{ height: 525, }}>
                    <ImageBackground
                        source={require('../../../assests/refferalPageBGImage.png')}
                        style={styles.BGImage}
                        resizeMode='stretch'
                    >
                        <Text style={styles.ReferHeaderText}>Refer Your Friends {'\n'}And Earn</Text>

                        <Image
                            source={require('../../../assests/refferalPageBoyGirlImage.png')}
                            style={[styles.refferralImage, { bottom: height * 0.05 }]}
                        />

                        <View style={[styles.wrapper, { bottom: height * 0.06 }]}>
                            <View style={styles.couponContainer}>
                                <View style={styles.codeSection}>
                                    <Text style={styles.codeText}>{referralCode}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => copyToClipboardReferralCode(referralCode)}
                                    style={styles.copySection}>
                                    <Text style={styles.copyText}>COPY</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.shareNow}>SHARE NOW</Text>
                        </View>
                        <View style={[styles.socialIconsContainer, { bottom: height * 0.02 }]}>
                            <TouchableOpacity style={[styles.IconImage]}>
                                <Image
                                    source={require('../../../assests/refferalPageWhatsappImage.png')}
                                    resizeMode='contain'
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.IconImage, { bottom: height * 0.02 }]}>
                                <Image
                                    source={require('../../../assests/refferalPageTelegramImage.png')}
                                    resizeMode='contain'
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.IconImage]}>
                                <Image
                                    source={require('../../../assests/refferalPageSmsImage.png')}
                                    resizeMode='contain'
                                />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ReferralPageUpparPart;

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    BGImage: {
        width: '100%',
        height: 550,
        paddingTop: 20,

    },
    ReferHeaderText: {
        fontSize: RFValue(20),
        fontWeight: '500',
        color: '#fff',
        textAlign: 'center',
        marginTop: 20,

    },
    refferralImage: {
        resizeMode: 'contain',
        width: '100%',
    },
    wrapper: {
        alignItems: 'center',
    },
    couponContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 50,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ccc',
        width: '70%',
        maxWidth: 320,
        height: 60,
    },
    codeSection: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    codeText: {
        fontSize: RFValue(16),
        fontWeight: 'normal',
        color: '#000',
    },
    copySection: {
        flex: 1,
        backgroundColor: '#FF9800',
        justifyContent: 'center',
        alignItems: 'center',
    },
    copyText: {
        fontSize: RFValue(16),
        fontWeight: 'normal',
        color: '#fff',
    },
    shareNow: {
        marginTop: 15,
        fontSize: RFValue(18),
        color: '#fff',
        fontWeight: 'normal',
    },
    socialIconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        gap: 10
    },
    IconImage: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 20,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
    },
})
