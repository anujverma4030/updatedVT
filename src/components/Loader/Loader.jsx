import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Loader = ({ visible }) => {

    return (
        <SafeAreaView>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                hardwareAccelerated={true}
                statusBarTranslucent={true}
                navigationBarTranslucent={true}
                onRequestClose={()=>{}}
            >
                <View style={styles.mainView}>

                    <ActivityIndicator
                        size={60}
                        color={'#fff'}

                    />


                </View>
            </Modal>

        </SafeAreaView>
    )
}

export default Loader

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    }
})