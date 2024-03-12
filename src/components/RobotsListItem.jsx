import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {ghostWhite, jet, neutral300} from '../styles/GlobalStyle';
import ConnectedIcon from '../assets/icons/statusIconGreen.svg';
import DisconnectedIcon from '../assets/icons/statusIconRed.svg';
import BatteryIcon from '../assets/svg/battery.svg';

const RobotsListItem = ({item}) => {
  return (
    <View style={styles.row}>
      <View style={styles.textContainer}>
        <Text style={styles.listItemText}>{item.name}</Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.listItemText}>ID de robot {item.id}</Text>
      </View>

      <View style={styles.textContainer}>
        <View style={styles.iconContainer}>
          {item.connectionStatus === 'Conectado' ? (
            <ConnectedIcon />
          ) : (
            <DisconnectedIcon />
          )}
        </View>
        <Text style={styles.listItemText}>{item.connectionStatus}</Text>
      </View>

      <View style={styles.textContainer}>
        <View style={styles.iconContainer}>
          <BatteryIcon />
        </View>
        <Text style={styles.listItemText}>{item.batteryLevel}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: ghostWhite,
    marginBottom: 24,
    height: 40,
    alignItems: 'center',
  },
  textContainer: {
    width: '25%',
    height: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderColor: neutral300,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemText: {
    fontFamily: 'Goldman-Regular',
    color: jet,
    fontSize: 16,
  },
  iconContainer: {
    width: 24,
    height: 24,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RobotsListItem;
