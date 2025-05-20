import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';


const ProfileScreenDownrside = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.cardContainer}>
            <View style={styles.card}>
                <TouchableOpacity onPress={() => { navigation.navigate('PersonalDetails') }} style={styles.option}>
                    <Icon name="person" size={24} color="#000" style={styles.icon} />
                    <Text style={styles.label}>Personal Details</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity onPress={() => { navigation.navigate('WalletInfo') }} style={styles.option}>
                    <Icon name="wallet" size={24} color="#000" style={styles.icon} />
                    <Text style={styles.label}>Wallet Info</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity style={styles.option}>
                    <Icon name="star" size={24} color="#000" style={styles.icon} />
                    <Text style={styles.label}>Membership Level</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity style={styles.option}>
                    <Icon name="description" size={24} color="#000" style={styles.icon} />
                    <Text style={styles.label}>Agreement</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity onPress={() => { navigation.navigate('TransactionHistory') }} style={styles.option}>
                    <Icon name="history" size={24} color="#000" style={styles.icon} />
                    <Text style={styles.label}>Transaction History</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity onPress={() => { navigation.navigate('Settings') }} style={styles.option}>
                    <Icon name="settings" size={24} color="#000" style={styles.icon} />
                    <Text style={styles.label}>Settings</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.signOutButton}>
                <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ProfileScreenDownrside

const styles = StyleSheet.create({
    cardContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 4,
        paddingVertical: 8,
        paddingHorizontal: 12,
        width: "90%"
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        marginVertical: 3
    },
    icon: {
        marginRight: 20
    },
    label: {
        fontSize: 16,
        color: '#000',
    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
    },
    signOutButton: {
        backgroundColor: '#FF8800',
        paddingVertical: 10,
        borderRadius: 6,
        marginTop: 40,
        alignSelf: 'center',
        paddingHorizontal: 60,
    },
    signOutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
})