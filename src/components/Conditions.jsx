import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import GlobalStyles from '../styles/GlobalStyle';

const Condition = () => {
  return (
    <View style={styles.container}>
      <Text style={GlobalStyles.title}>PROXIMAMENTE...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Condition;
