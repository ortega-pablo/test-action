import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {jet} from '../styles/GlobalStyle';

const SVGBackground = ({children}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/Background.png')}
        style={styles.image}>
        {children}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: jet,
  },
  image: {
    flex: 1,
  },
});

export default SVGBackground;
