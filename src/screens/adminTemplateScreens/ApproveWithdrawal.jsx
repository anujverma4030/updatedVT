import { Dimensions, StatusBar, StyleSheet, Text, TouchableOpacity, View, ScrollView, FlatList, Image } from 'react-native'
import React from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import Loader from '../../components/Loader/Loader'

import AdminTemplateHeaderPart from '../../components/Header/AdminTemplateHeaderPart'
import Icon from 'react-native-vector-icons/MaterialIcons';
const ApproveWithdrawal = () => {
    const inset = useSafeAreaInsets();
    const { height, width } = Dimensions.get('window');
    const isLoading = false
    const withdraawalApproval = [
        {
            id: 1,
            name: 'Lavkush',
            image: 'image',
            time: '9 AM'
        },
        {
            id: 2,
            name: 'Lavkush',
            image: 'image',
            time: '9 AM'
        },
        {
            id: 3,
            name: 'Lavkush',
            image: 'image',
            time: '9 AM'
        },
    ];
    const renderItem = (item) => {
        return (
            <View style={styles.renderMainView}>

            </View>
        )
    }
    return (
        <>
            <StatusBar backgroundColor={'transparent'} barStyle={"dark-content"} translucent />

            <SafeAreaView style={{ flex: 1 }}>
                {
                    isLoading ? <Loader visible={isLoading} /> : (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={[styles.scrollViewContent, { paddingBottom: inset.bottom + 50 }]}
                        >
                            <AdminTemplateHeaderPart name={'Approve Withdrawals'} />
                            <View style={styles.dashboardWrapper}>
                                {/* <FlatList
                                    data={withdraawalApproval}
                                    keyExtractor={() => item.id.toString()}
                                    renderItem={renderItem}
                                    ListEmptyComponent={() => {
                                        <View>
                                            <Text>No withdrawal request found</Text>
                                        </View>
                                    }}

                                /> */}
                                {/* {renderItem} */}
                                <View style={{
                                    flexDirection: 'row',
                                    width: '100%',
                                    borderBottomWidth: 1,
                                    borderColor: '#0000001A',
                                    gap: 10,
                                    padding: 10,
                                    // alignItems: 'center'
                                    // justifyContent:'center'
                                }}>
                                    <Image
                                        source={{ uri: 'https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg' }}
                                        resizeMode='cover'
                                        style={{
                                            width: 60,
                                            height: 60,
                                            borderRadius: 30,
                                            top:5
                                        }}
                                    />
                                    {/* User  */}
                                    <View 
                                    style={{
                                       gap:5
                                    }}
                                    >
                                        <Text>New</Text>
                                        <Text
                                            style={{
                                                fontFamily: 'Poppins',
                                                fontWeight: '600',
                                                fontSize: 16,


                                            }}
                                        >Name Aman</Text>
                                        <Text>Aman Requested to withdraw balance</Text>
                                        {/* Button View */}
                                        <View style={{
                                            flexDirection: 'row',
                                            gap: 20,
                                            marginVertical: 10
                                        }}>
                                            <TouchableOpacity
                                                style={{
                                                    width: 67,
                                                    height: 30,
                                                    borderRadius: 4,
                                                    backgroundColor: '#FF8800',
                                                    justifyContent: 'center',
                                                    borderWidth: 0.5,
                                                    borderColor: '#FF8800',
                                                 

                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily: 'Outfit',
                                                        fontWeight: '600',
                                                        fontSize: 13,
                                                        textAlign: 'center',
                                                        color: '#fff'
                                                    }}
                                                >Approve</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={{
                                                    width: 67,
                                                    height: 30,
                                                    borderRadius: 4,
                                                    backgroundColor: '#FFFFFF',
                                                    justifyContent: 'center',
                                                    borderWidth: 0.5,
                                                    borderColor: '#FF8800'

                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily: 'Outfit',
                                                        fontWeight: '600',
                                                        fontSize: 13,
                                                        textAlign: 'center',
                                                        color: '#FF8800'
                                                    }}

                                                >Cancel</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </View>
                                    <Text>9:00 AM</Text>

                                </View>

                            </View>

                        </ScrollView>
                    )
                }

            </SafeAreaView>
        </>
    )
}

export default ApproveWithdrawal

const styles = StyleSheet.create({
    scrollViewContent: {
        backgroundColor: '#fff',
        flexGrow: 1,
        // justifyContent:'center',
        // alignItems: 'center'
    },
    dashboardWrapper: {
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        // justifyContent:'center',
        alignItems: 'center',
        width: '100%',
    },
    renderMainView: {
        flexDirection: 'row',
    }
})