import React from 'react';
import {Text, View} from 'react-native';
import CustomButton from './Button';
import GlobalStyles from '../styles/GlobalStyle';
import {useNavigation} from '@react-navigation/native';

const NewTest = () => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('Gamepad');
  };

  return (
    <View style={GlobalStyles.panelComponentContainer}>
      <Text style={GlobalStyles.title}>Nueva Evaluación</Text>
      <CustomButton
        size="medium"
        title={'Iniciar'}
        type="primary"
        onPress={onPress}
      />
    </View>
  );
};

export default NewTest;
