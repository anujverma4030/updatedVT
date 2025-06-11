import React, { useReducer, useRef, useState } from 'react';
import { Modal, Dimensions, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Easing, Animated } from 'react-native';
import SpinPageBackSide from '../../components/Header/SpinPageBackSide';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialIcons'

import Svg, { Circle, G, Path, Text as SvgText, Defs, Stop, LinearGradient } from "react-native-svg";


// const prizes = [
//   "50$", "1$", "5$", "20$", "JACKPOT", "15$",
//   "100$", "1$", "500$", "10$", "ZERO", "2$",
// ];
const prizes = [
  "IPHONE", "$333", "IPAD", "WATCH", "$0.11", "$0.66",
  "$0.33", "$111", "$11", "$66", "$0", "$333",
];

const { width } = Dimensions.get("window");
const colors = ["#ffbf80", "#661a00"];
const wheelSize = width * 0.8;
const numberOfSegments = 12;
const angleBySegment = 360 / numberOfSegments;
const oneTurn = 360;

function calculateArc(startAngle, endAngle) {
  const r = wheelSize / 2;
  const x1 = r + r * Math.cos((Math.PI / 180) * startAngle);
  const y1 = r + r * Math.sin((Math.PI / 180) * startAngle);
  const x2 = r + r * Math.cos((Math.PI / 180) * endAngle);
  const y2 = r + r * Math.sin((Math.PI / 180) * endAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M${r},${r} L${x1},${y1} A${r},${r} 0 ${largeArcFlag} 1 ${x2},${y2} Z`;
}

const SpinScreen = () => {
  const [winner, setWinner] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const { height, width } = Dimensions.get('window');
  const [showModal, setShowModal] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const wheelRotation = useRef(0);

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWinner("");
    setShowModal(false);
    const randomIndex = Math.floor(Math.random() * numberOfSegments);

    // Subtract 90 deg to align the winner at the top (12 o'clock)
    const rotateTo = 360 * 6 + (360 - (randomIndex * angleBySegment + angleBySegment / 2) - 90);

    Animated.timing(animatedValue, {
      toValue: rotateTo,
      duration: 4000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      wheelRotation.current = rotateTo % oneTurn; // Keep the rotation value within 0-360
      setIsSpinning(false);
      setWinner(prizes[randomIndex]);
      animatedValue.setValue(wheelRotation.current);
      setTimeout(() => setShowModal(true), 500);
    });
  };

  const interpolatedRotate = animatedValue.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });
  // const wheelSize = width * 0.92;
  return (
    <ImageBackground
      source={require('../../assests/spinPageBGImage.png')}
      style={styles.BGImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>

        <SpinPageBackSide />
        <View style={styles.spinContainer}>
          <Svg width={wheelSize + 18} height={wheelSize + 18} style={{ position: "absolute" }}>
            <Circle
              cx={(wheelSize + 18) / 2}
              cy={(wheelSize + 18) / 2}
              r={wheelSize / 2 + 6}
              fill="none"
              stroke="#FFD700"
              strokeWidth={5}
            />
          </Svg>
          {/* <Path d={path} fill={colors[i % colors.length]} /> */}
          

              <Animated.View style={{ transform: [{ rotate: interpolatedRotate }] }}>
                <Svg width={wheelSize} height={wheelSize}>
                  <Defs>
                    {prizes.map((_, i) => (
                      <LinearGradient
                        key={`grad-${i}`}
                        id={`grad-${i}`}
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                      >
                        <Stop offset="0%" stopColor={i % 2 === 0 ? '#FFE8AC' : '#FFC14D'} />
                        <Stop offset="100%" stopColor={i % 2 === 0 ? '#FF8C4A' : '#9C1000'} />
                      </LinearGradient>
                    ))}
                  </Defs>
                  <G>
                    {prizes.map((prize, i) => {
                      const start = i * angleBySegment;
                      const end = (i + 1) * angleBySegment;
                      const path = calculateArc(start, end);
                      const r = (wheelSize / 2) * 0.75;
                      const mid = start + angleBySegment / 2;
                      const x = wheelSize / 2 + r * Math.cos((Math.PI / 180) * mid);
                      const y = wheelSize / 2 + r * Math.sin((Math.PI / 180) * mid);
                      return (
                        <G key={i}>

                          <Path d={path} fill={`url(#grad-${i})`} />

                          <SvgText
                            x={x}
                            y={y}
                            fill="#fff"
                            fontSize="14"
                            fontWeight="bold"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                            transform={`rotate(${mid}, ${x}, ${y})`}
                          >
                            {prize}
                          </SvgText>
                        </G>

                      );
                    })}
                  </G>
                </Svg>

              </Animated.View>
              {/* <Animated.Image
            source={require('../../assests/spinWheelImage3.png')} // wheel image
            style={{
              width: wheelSize,
              height: wheelSize,
              transform: [{ rotate: interpolatedRotate }],
             
            }}
            resizeMode="contain"

          /> */}
              <View style={styles.knobContainer}>
                <View style={styles.knobInside}>
                  <Image
                    source={require("../../assests/knob2.png")}
                    style={styles.knobPointer}
                  />
                </View>
             
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Icon name='keyboard-double-arrow-down' size={50} color="#FFFFFFA1" style={{ marginBottom: 10 }} />
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.button, isSpinning && { backgroundColor: "#999" }]}
            onPress={spinWheel}
            disabled={isSpinning}
          >
            <Text style={styles.buttonText}>
              {isSpinning ? "Spinning..." : "Spin Now"}
            </Text>
          </TouchableOpacity>
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
              <Text style={{ fontSize: RFValue(20), fontWeight: '400', marginBottom: 10 }}>You Won</Text>
              <Text style={{ fontSize: RFValue(20), marginBottom: 10 }}>{winner}</Text>
              <Icon name='keyboard-double-arrow-down' size={24} color="orange" style={{ marginBottom: 10 }} />

              <View style={{ flex: 1 }} />
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.spinModalButton, { top: height * 0.29 }]} onPress={() => {
                  setShowModal(false);
                  setWinner("");
                  spinWheel();

                }
                }>
                <Text style={styles.signInButtonText}>Spin Again</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 16 }}>
                <Text style={{ color: "#555", fontSize: 16 }}>Close</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground >
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
  spinModalButton: {
    position: 'absolute',
    backgroundColor: '#34A853',
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
    width: '90%',
    height: 400,
    alignItems: 'center',
    justifyContent: 'space-between', // 
  },
  modalButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    width: '70%'
  },
  spinContainer: {
    alignItems: "center",
    justifyContent: "center",
    bottom: 200,
  },
  knobContainer: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 30,
    // backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,

  },
  knobInside: {
    width: 25,
    height: 25,
    borderRadius: 30,
    // backgroundColor: "rgb(172, 55, 16)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
  },
  knobPointer: {
    position: "absolute",
    top: -10,
    width: 33,
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    // transform: [{ rotate: "30deg" }],
    // zIndex: 4,
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    // marginTop: 40,
    bottom: 180,
  },
  button: {
    backgroundColor: "#34A853",
    paddingHorizontal: 120,
    paddingVertical: 14,
    borderRadius: 5,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    borderWidth: 0.5,
    borderColor: "#ccc",

  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: RFValue(12),
  },
});