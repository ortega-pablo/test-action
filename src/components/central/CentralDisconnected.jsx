import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import GlobalStyles from '../../styles/GlobalStyle';
import CustomButton from '../Button';
import ConnectIcon from '../../assets/svg/connect.svg';

const CentralDisconnected = ({handleConnect}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={GlobalStyles.title}>Conectar terminal</Text>
        <Text style={GlobalStyles.subTitle}>Primer paso:</Text>
        <Text style={GlobalStyles.text}>
          1. Verifica que la terminal esté encendida
        </Text>
        <Text style={GlobalStyles.subTitle}>Segundo paso:</Text>
        <Text style={GlobalStyles.text}>
          2. Conectarme a la red WiFi de la terminal
        </Text>
        <Text style={GlobalStyles.subTitle}>Tercer paso:</Text>
        <Text style={GlobalStyles.text}>
          3. Explorar la validación de conexión con la terminal
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title={'Conectar'}
          type={'primary'}
          size={'medium'}
          onPress={handleConnect}
          icon={<ConnectIcon />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});

export default CentralDisconnected;
