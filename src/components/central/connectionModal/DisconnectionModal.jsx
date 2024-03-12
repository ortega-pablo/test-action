// ConnectionModal.js
import React from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import ExitIcon from '../../../assets/icons/exitIcon.svg';
import GlobalStyles from '../../../styles/GlobalStyle';
import {useDispatch} from 'react-redux';
import CustomButton from '../../Button';
import {
  setNetworkStatus,
  setSocketStatus,
} from '../../../redux/connectionSlice';
import {useToast} from 'react-native-toast-notifications';

const DisconnectionModal = ({modalVisible, setModalVisible, setSelected}) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const handleConnectionEnd = async () => {
    setModalVisible(!modalVisible);
    setSelected('Central');
  };

  const onCloseConnection = () => {
    dispatch(setNetworkStatus('disconnected'));
    dispatch(setSocketStatus('disconnected'));
    setModalVisible(!modalVisible);
    toast.show('Desconexión realizada correctamente', {type: 'customSuccess'});
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={GlobalStyles.modalContainer}>
        <View style={GlobalStyles.disconnectionModalContent}>
          <View style={GlobalStyles.modalHeader}>
            <Text style={GlobalStyles.modalTitle}>
              ¿Seguro que desea desconectarse?
            </Text>
            <TouchableOpacity onPress={() => handleConnectionEnd()}>
              <ExitIcon width={16} height={16} />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonsContainer}>
            <CustomButton
              type="secondary"
              title={'Cancelar'}
              onPress={handleConnectionEnd}
            />
            <CustomButton
              size="medium"
              type="primary"
              title={'Confirmar'}
              onPress={onCloseConnection}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalTextContainer: {
    width: '100%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
});

export default DisconnectionModal;
