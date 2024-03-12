// ConnectionModal.js
import React from 'react';
import {View, Text, Modal, StyleSheet} from 'react-native';
import GlobalStyles, {
  darkRed,
  info,
  neutral600,
} from '../../styles/GlobalStyle';
import CustomButton from '../Button';
import ShotCounter from './ShotsCounter';
import {useNavigation} from '@react-navigation/native';

const TestStatusModal = ({
  modalVisible,
  setModalVisible,
  status = 'paused',
  elapsedTime,
  setIsRunning,
}) => {
  const navigate = useNavigation();

  const stopTest = () => {
    setModalVisible(false);
    navigate.replace('GeneralPanel', {selected: 'Nuevo'});
  };

  const onResume = () => {
    setModalVisible(false);
    setIsRunning(true);
  };

  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={GlobalStyles.modalContainer}>
        <View style={GlobalStyles.connectionModalContent}>
          <View style={GlobalStyles.modalHeader}>
            <Text style={GlobalStyles.modalTitle}>Estado de evaluación</Text>
          </View>
          <View style={GlobalStyles.modalConnectionBox}>
            <View style={styles.textContainer}>
              <Text style={GlobalStyles.modalTitle}>Evaluación </Text>
              <Text
                style={[
                  GlobalStyles.modalTitle,
                  {color: status === 'stopped' ? darkRed : info},
                ]}>
                {status === 'stopped' ? 'detenida' : 'pausada'}{' '}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Tiempo transcurrido: </Text>
              <Text style={styles.text2}>
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </Text>
            </View>
            <ShotCounter />
          </View>

          {status === 'stopped' ? (
            <View style={styles.buttonsContainer}>
              <CustomButton
                type="secondary"
                title={'Cancelar'}
                onPress={onResume}
              />
              <CustomButton
                size="medium"
                type="primary"
                title={'Finalizar evaluación'}
                onPress={stopTest}
              />
            </View>
          ) : (
            <CustomButton
              size="large"
              type="primary"
              title={'Reanudar'}
              onPress={onResume}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 8,
    padding: 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  text: {
    fontSize: 14,
    fontFamily: 'andalemo',
    color: neutral600,
  },
  text2: {
    fontSize: 14,
    fontFamily: 'Goldman-Regular',
    color: neutral600,
  },
  icon: {
    marginRight: 16,
  },
});
export default TestStatusModal;
