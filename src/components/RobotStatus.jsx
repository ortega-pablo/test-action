import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import GlobalStyles from '../styles/GlobalStyle';
import StatusIconGreen from '../assets/icons/statusIconGreen.svg';
import StatusIconRed from '../assets/icons/statusIconRed.svg';
import StatusIconYellow from '../assets/icons/statusIconYellow.svg';

const RobotStatus = ({signal, customStyle}) => {
  return (
    <View style={[styles.container, customStyle]}>
      <View style={styles.icon}>
        {signal >= 70 && signal <= 100 ? (
          <StatusIconGreen />
        ) : signal < 40 && signal >= 0 ? (
          <StatusIconRed />
        ) : (
          <StatusIconYellow />
        )}
      </View>
      <Text style={GlobalStyles.text}>
        {signal >= 70 && signal <= 100
          ? 'Conectado'
          : signal < 40 && signal >= 0
          ? 'Desconectado'
          : 'Débil'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 8,
  },
  container: {
    display: 'flex',
    width: 150,
    flexDirection: 'row',
  },
});
export default RobotStatus;
