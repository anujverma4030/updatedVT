// components/WheelOfFortune.js
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as d3Shape from 'd3-shape';
import Svg, { G, Text as SvgText, TSpan, Path } from 'react-native-svg';

const { width, height } = Dimensions.get('screen');

class WheelOfFortune extends Component {
  constructor(props) {
    super(props);
    this.state = {
      started: false,
      finished: false,
      winner: null,
    };

    this.Rewards = props.options.rewards;
    this.RewardCount = this.Rewards.length;
    this.angleBySegment = 360 / this.RewardCount;
    this.angleOffset = this.angleBySegment / 2;
    this.oneTurn = 360;

    this._angle = new Animated.Value(0);
    this.angle = 0;

    this._wheelPaths = this.makeWheel();
    props.options.onRef(this);
  }

  componentDidMount() {
    this._angle.addListener(event => {
      this.angle = event.value;
    });
  }

  componentWillUnmount() {
    this.props.options.onRef(undefined);
  }

  makeWheel = () => {
    const data = Array.from({ length: this.RewardCount }).fill(1);
    const arcs = d3Shape.pie()(data);
    const colors =
      this.props.options.colors || [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40',
      ];

    return arcs.map((arc, index) => {
      const instance = d3Shape
        .arc()
        .padAngle(0.01)
        .outerRadius(width / 2)
        .innerRadius(80);
      return {
        path: instance(arc),
        color: colors[index % colors.length],
        value: this.Rewards[index],
        centroid: instance.centroid(arc),
      };
    });
  };

  _getWinnerIndex = () => {
    const deg = Math.abs(Math.round(this.angle % 360));
    return (
      (this.RewardCount - Math.floor(deg / this.angleBySegment)) %
      this.RewardCount
    );
  };

  _onPress = () => {
    const duration = this.props.options.duration || 5000;
    const winnerIndex = Math.floor(Math.random() * this.RewardCount);

    Animated.timing(this._angle, {
      toValue:
        360 * (duration / 1000) +
        (360 - winnerIndex * this.angleBySegment),
      duration,
      useNativeDriver: true,
    }).start(() => {
      this.setState({
        finished: true,
        winner: this._wheelPaths[winnerIndex].value,
      });
      this.props.getWinner(this._wheelPaths[winnerIndex].value, winnerIndex);
    });

    this.setState({ started: true });
  };

  _textRender = (x, y, value, i) => (
    <SvgText
      key={`text-${i}`}
      x={x}
      y={y}
      fill="#fff"
      fontSize={14}
      textAnchor="middle">
      <TSpan x={x} dy={5}>
        {value}
      </TSpan>
    </SvgText>
  );

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            transform: [
              {
                rotate: this._angle.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          }}>
          <Svg width={width} height={width} viewBox={`0 0 ${width} ${width}`}>
            <G x={width / 2} y={width / 2}>
              {this._wheelPaths.map((arc, i) => {
                const [x, y] = arc.centroid;
                return (
                  <G key={`arc-${i}`}>
                    <Path d={arc.path} fill={arc.color} />
                    <G
                      rotation={(i * this.oneTurn) / this.RewardCount + this.angleOffset}
                      origin={`${x}, ${y}`}>
                      {this._textRender(x, y, arc.value, i)}
                    </G>
                  </G>
                );
              })}
            </G>
          </Svg>
        </Animated.View>

        {this.props.options.playButton && !this.state.started && (
          <TouchableOpacity onPress={this._onPress} style={{ marginTop: 20 }}>
            {this.props.options.playButton()}
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default WheelOfFortune;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
