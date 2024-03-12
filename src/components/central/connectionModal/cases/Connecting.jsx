import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {jet, orangeYellow} from '../../../../styles/GlobalStyle';
import * as Progress from 'react-native-progress';

export default function Connecting() {
  return (
    <View style={styles.loaderContainer}>
      <Progress.CircleSnail
        color={[orangeYellow]}
        size={120}
        indeterminate={true}
        thickness={6}
      />
      <Text style={styles.loaderText}>Conectando...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    marginTop: 36,
    marginBottom: 12,
  },
  loaderText: {
    color: jet,
    fontFamily: 'Goldman-Regular',
    fontSize: 16,
  },
});
