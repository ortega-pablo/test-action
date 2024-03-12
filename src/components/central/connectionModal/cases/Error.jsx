import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import GlobalStyles, {neutral600} from '../../../../styles/GlobalStyle';
import StatusIconRed from '../../../../assets/icons/statusIconRed.svg';

const Error = () => {
  const {errorMessage} = useSelector(state => state.connection);
  return (
    <View style={GlobalStyles.modalConnectionBox}>
      <View style={styles.spacing}>
        <Text style={GlobalStyles.modalTitle}>Estado de conexión</Text>
        <View style={GlobalStyles.modalConnectionBoxStatus}>
          <StatusIconRed width={24} height={24} />
          <Text style={GlobalStyles.modalStatus}>Error</Text>
        </View>
      </View>
      <Text style={styles.errorText}>Error: {errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  spacing: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorText: {
    color: neutral600,
    fontFamily: 'andalemo',
    fontSize: 16,
  },
});

export default Error;
