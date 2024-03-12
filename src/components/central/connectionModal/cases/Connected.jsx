import {Text, View} from 'react-native';
import React from 'react';
import StatusIconGreen from '../../../../assets/icons/statusIconGreen.svg';
import GlobalStyles from '../../../../styles/GlobalStyle';

const Connected = () => {
  return (
    <>
      <View style={GlobalStyles.modalConnectionBox}>
        <View style={GlobalStyles.modalConnectionBoxHeader}>
          <Text style={GlobalStyles.modalTitle}>Estado de conexión</Text>
        </View>
        <View style={GlobalStyles.modalConnectionBoxContent}>
          <Text style={GlobalStyles.modalText}>Wifi - ESP Master</Text>
          <View style={GlobalStyles.modalConnectionBoxStatus}>
            <StatusIconGreen width={24} height={24} />
            <Text style={GlobalStyles.modalStatus}>Conectado</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default Connected;
