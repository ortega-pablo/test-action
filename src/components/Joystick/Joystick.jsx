import React, {PureComponent} from 'react';
import {
  Animated,
  PanResponder,
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {neutral200, neutral300} from '../../styles/GlobalStyle';
import {sendData} from '../../utils/socket';
import {Vibration} from 'react-native';

const window = Dimensions.get('window');
const joystickMovementLimit = 100; // 1 cm en píxeles

class Joystick extends PureComponent {
  constructor(props) {
    super(props);
    this.pan = new Animated.ValueXY();
    this.intervalId = null;
    this.state = {
      parentWidth: window.width,
      parentHeight: window.height,
    };
  }

  componentDidUpdate(prevProps) {
    // Aquí puedes manejar los cambios en pan
    if (this.props.pan !== prevProps.pan) {
      this.pan = this.props.pan;
      // Aquí puedes agregar cualquier lógica adicional que necesites
      // para manejar los cambios en pan
    }
  }

  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      this.pan.setOffset({x: 0, y: 0});
      this.pan.setValue({x: 0, y: 0});
      this.intervalId = setInterval(() => {
        let radius = Math.sqrt(
          this.pan.x._value * this.pan.x._value +
            this.pan.y._value * this.pan.y._value,
        );
        radius = Math.round(radius);
        let positionX = -Math.round(this.pan.y._value);
        let positionY = Math.round(this.pan.x._value);
        let angle =
          (Math.atan2(positionY, positionX) * (180 / Math.PI) + 360) % 360;
        angle = Math.round(angle);
        console.log(this.pan.x._value, this.pan.y._value);
        sendData(`dir:${radius},${angle},${positionX},${positionY}`);
        Vibration.vibrate([10, 4], true);
      }, 20);
    },
    onPanResponderMove: (e, gestureState) => {
      let newX = gestureState.dx;
      let newY = gestureState.dy;
      const distance = Math.sqrt(newX * newX + newY * newY);
      if (distance > joystickMovementLimit) {
        const ratio = joystickMovementLimit / distance;
        newX *= ratio;
        newY *= ratio;
      }
      this.pan.setValue({x: newX, y: newY});
    },
    onPanResponderRelease: () => {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        sendData('dir:0,0,0,0');
        Vibration.cancel();
      } // Detiene la emisión de la posición
      Animated.spring(this.pan, {
        toValue: {x: 0, y: 0},
        useNativeDriver: false,
      }).start();
      this.pan.flattenOffset();
    },
  });

  render() {
    return (
      <View>
        <View
          style={styles.joystickContainer}
          onLayout={event => {
            const {width, height} = event.nativeEvent.layout;
            this.setState({parentWidth: width, parentHeight: height});
          }}>
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[
              styles.joystick,
              {
                transform: [{translateX: this.pan.x}, {translateY: this.pan.y}],
                left: this.state.parentWidth / 2 - 15,
                top: this.state.parentHeight / 2 - 15,
              },
            ]}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  joystickContainer: {
    height: 200,
    width: 200,
    borderRadius: 100,
    backgroundColor: neutral200,
  },
  joystick: {
    height: 30,
    width: 30,
    borderRadius: 75,
    backgroundColor: neutral300,
    position: 'absolute',
  },
});

export default Joystick;
