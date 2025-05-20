import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

const PersonalDetails = () => {
    const navigation = useNavigation();
    const { height, width } = Dimensions.get('window');

    return (
        <SafeAreaView style={styles.MainContainer}>
            <ScrollView>
                <View style={styles.headerContentContainer}>
                    <View style={styles.headerTextContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back" size={20} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>Personal Details</Text>
                    </View>
                    <View style={styles.IconSubContainer}>
                        <TouchableOpacity>
                            <Icon name="edit-square" size={24} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name="settings" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.profileImageAndTextContainer}>
                    <Image
                        source={require('../../../assests/profileScreeenProfileImage.png')}
                        style={styles.Image}
                    />
                    <TouchableOpacity
                        style={[styles.carmeraIcon, { right: width * 0.08, top: height * 0.09 }]}
                    >
                        <Icon name="add-a-photo" size={14} />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.UserIdText}>UserID</Text>
                        <Text style={styles.IdText}>EMP12345</Text>
                    </View>
                </View>

                <View style={styles.inputsMainContainer}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput style={styles.input} value="Rohan Sharma" editable={false} />

                    <Text style={styles.label}>Date Of Birth</Text>
                    <View style={styles.dateInput}>
                        <Text style={styles.dateText}>13 May , 2000</Text>
                        <Icon name="calendar-today" size={20} color="#4CAF50" />
                    </View>

                    <Text style={styles.label}>Gender</Text>
                    <View style={styles.genderContainer}>
                        <TouchableOpacity style={[styles.genderButton, styles.genderSelected]}>
                            <Text style={[styles.genderText, styles.selectedText]}>Male</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.genderButton}>
                            <Text style={styles.genderText}>Female</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>E-Mail</Text>
                    <TextInput style={styles.input} value="rohan@example.com" editable={false} />

                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput style={styles.input} value="9876543210" editable={false} />

                    <Text style={styles.label}>Referral Code</Text>
                    <View style={styles.referralContainer}>
                        <TextInput style={styles.referralInput} value="Rohan2025" editable={false} />
                        <TouchableOpacity style={styles.copyButton}>
                            <Text style={styles.copyText}>Copy</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.verifiedButton}>
                        <Text style={styles.verifiedText}>Account Verified</Text>
                        {/* <Icon name="check-circle" size={36} color="#FF9800" /> */}
                    </TouchableOpacity>

                    <View style={styles.checkIconContainer}>
                        <Icon name="check-circle" size={36} color="#FF9800" />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PersonalDetails;

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#34A853',
        paddingVertical: 30,
        paddingHorizontal: 30,
    },
    headerTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    headerText: {
        fontSize: RFValue(20),
        fontWeight: '500',
        color: '#fff',
    },
    IconSubContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    profileImageAndTextContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        margin: 25,
    },
    Image: {
        resizeMode: 'contain',
    },
    carmeraIcon: {
        backgroundColor: '#FFFFFF',
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        borderRadius: 50,
    },
    UserIdText: {
        fontSize: RFValue(12),
        fontWeight: '500',
        color: '#8F8F8F',
        marginTop: 10,
    },
    IdText: {
        fontSize: RFValue(10),
        fontWeight: '500',
        color: '#000',
    },
    inputsMainContainer: {
        padding: 20, 
    },
    label: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#999',
        marginBottom: 5,
        marginTop: 5, 
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 12,
        color: '#000',
    },
    dateInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateText: {
        color: '#000',
    },
    genderContainer: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 5,
    },
    genderButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 6,
    },
    genderSelected: {
        backgroundColor: '#3D5AFE',
        borderColor: '#3D5AFE',
    },
    genderText: {
        color: '#000',
    },
    selectedText: {
        color: '#fff',
        fontWeight: '600',
    },
    referralContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    referralInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 12,
        color: '#000',
    },
    copyButton: {
        backgroundColor: '#FFA500',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 6,
    },
    copyText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    verifiedButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 6,
        marginTop: 30,
        alignItems: 'center',
        // flexDirection:'row',
        // justifyContent:"center",
    },
    verifiedText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    checkIconContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
});
