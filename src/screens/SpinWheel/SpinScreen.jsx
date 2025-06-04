import React, { useState } from 'react';
import { Modal, Dimensions, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SpinPageBackSide from '../../components/Header/SpinPageBackSide';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialIcons'

const SpinScreen = () => {
  const { height, width } = Dimensions.get('window');
  const [showModal, setShowModal] = useState(false);
  return (
    <ImageBackground
      source={require('../../assests/spinPageBGImage.png')}
      style={styles.BGImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>

        <SpinPageBackSide />

        <View style={[styles.spinWheelImageContainer, { bottom: height * 0.07, left: width * 0.02 }]}>
          <Image
            source={require('../../assests/spinWheelImage.png')}
            style={styles.spinWheelImage}
          />
          {/* <Image
          source={require('../../assests/spinPageGiftImage.png')}
          style={{ width: 20, height: 20, marginBottom: 15 }}
          resizeMode='contain'
          /> */}

          {/* Down Arrow Icon  */}
          <Icon
            name='keyboard-double-arrow-down'
            size={RFValue(40)} // responsive size
            color='#FFFFFFA1'
            style={[styles.DownIcon, { bottom: height * 0.2 }]}
          />
          {/* Sign In Button and Text */}
          <View style={[styles.signInButton, { bottom: height * 0.15 }]}>
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Text style={styles.signInButtonText}>Spin Now</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.freeSpinText, { bottom: height * 0.12 }]}>
            Daily 3 Spins Free More spins via referral
          </Text>
        </View>

        <Modal
          animationType='fade'
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
          hardwareAccelerated={true}
          statusBarTranslucent={true}
        navigationBarTranslucent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image
                source={require('../../assests/spinPageGiftImage.png')}
                style={{ width: 100, height: 100, bottom: 60 }}
                resizeMode='contain'
              />
              <Text style={{ fontSize: RFValue(30), fontWeight: 'bold', color: '#FF8800', bottom: 40 }}>Lucky Spin Star!</Text>
              <Text style={{ fontSize: RFValue(20), fontWeight: '400', marginBottom: 10 }}>You’ve Won A Gift Pack</Text>
              <Text style={{ fontSize: RFValue(12), marginBottom: 10 }}>Spin Now For Another Win!</Text>
              <Icon name='keyboard-double-arrow-down' size={24} color="orange" style={{ marginBottom: 10 }} />

              <View style={{ flex: 1 }} />
              <TouchableOpacity style={[styles.signInButton, { top: height * 0.29 }]} onPress={() => setShowModal(false)}>
                <Text style={styles.signInButtonText}>Spin Again</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SpinScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  BGImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  spinWheelImageContainer: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: '95%',
    width: '95%'
  },
  spinWheelImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  signInButton: {
    position: 'absolute',
    backgroundColor: 'green',
    width: "80%",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 30,
    zIndex: 10,         // Add this
    elevation: 10
  },
  signInButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: RFValue(14),
    fontWeight: 400
  },
  DownIcon: {
    position: 'absolute'
  },
  freeSpinText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: RFValue(10),
    fontWeight: 'normal'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    height: 350, // give a fixed height
    alignItems: 'center',
    justifyContent: 'space-between', // <--- THIS
  },
  modalButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    width: '70%'
  },
});