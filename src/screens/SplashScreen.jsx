import React, {useEffect, useState} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';
import {orangeYellow} from '../styles/GlobalStyle';

const SplashScreen = ({navigation}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Redirigir a la pantalla de vinculación después de 3 segundos
      setProgress(1);
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../assets/images/Inicio.jpg')}
      style={styles.background}>
      <Progress.Bar
        progress={progress}
        width={328}
        style={styles.progressBar}
        color={orangeYellow}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  progressBar: {
    position: 'absolute',
    bottom: '25%',
    left: '50%',
    transform: [{translateX: -164}],
  },
});

export default SplashScreen;
