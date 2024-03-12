import {Text, View} from 'react-native';
import React from 'react';
import StatusIconRed from '../../../../assets/icons/statusIconRed.svg';
import GlobalStyles from '../../../../styles/GlobalStyle';

const Disconnected = () => {
  return (
    <View style={GlobalStyles.modalConnectionBox}>
      <View style={GlobalStyles.modalConnectionBoxHeader}>
        <Text style={GlobalStyles.modalTitle}>Estado de conexión</Text>
      </View>
      <View style={GlobalStyles.modalConnectionBoxContent}>
        <Text style={GlobalStyles.modalText}>Wifi - ESP Master</Text>
        <View style={GlobalStyles.modalConnectionBoxStatus}>
          <StatusIconRed width={24} height={24} />
          <Text style={GlobalStyles.modalStatus}>Desconectado</Text>
        </View>
      </View>
    </View>
  );
};

export default Disconnected;
