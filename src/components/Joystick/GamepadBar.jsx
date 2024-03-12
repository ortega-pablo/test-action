import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ClockIcon from '../../assets/svg/clock.svg';
import BatteryIcon from '../../assets/svg/battery-2.svg';
import PlugIcon from '../../assets/svg/plug.svg';

const GamepadBar = ({elapsedTime, setElapsedTime, isRunning, setIsRunning}) => {
  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  return (
    <View style={styles.container}>
      <View style={[styles.textContainer]}>
        <View style={styles.icon}>
          <BatteryIcon />
        </View>
        <Text style={styles.text}>Batería: 48%</Text>
      </View>
      <Text style={styles.separator}>|</Text>
      <View style={[styles.textContainer]}>
        <View style={styles.icon}>
          <PlugIcon />
        </View>
        <Text style={styles.text}>23Min / Autonomía</Text>
      </View>
      <Text style={styles.separator}>|</Text>
      <View style={styles.textContainer}>
        <View style={styles.icon}>
          <ClockIcon />
        </View>
        <Text style={styles.text}>
          Duración de evaluación: {elapsedTime > 59 ? `${minutes}min` : null}
          {elapsedTime > 59 ? null : ':'}
          {elapsedTime > 59
            ? null
            : seconds < 10
            ? `0${seconds}seg`
            : `${seconds}seg`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 710,
    height: 32,
    flexDirection: 'row',
    backgroundColor: '#00000040',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
  },
  text: {
    fontFamily: 'andalemo',
    fontSize: 14,
    color: '#fff',
  },
  icon: {
    width: 16,
    height: 8,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  separator: {
    color: '#747678',
  },
});
export default GamepadBar;
