import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ghostWhite, red} from '../../styles/GlobalStyle';

const StopButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>DETENER</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 172,
    height: 172,
    borderRadius: 200,
    backgroundColor: red + 'B3',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 10,
    borderColor: red + '5F',
  },
  text: {
    fontFamily: 'Goldman-Regular',
    fontSize: 20,
    color: ghostWhite,
  },
});
export default StopButton;
