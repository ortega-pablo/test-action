// ConnectionModal.js
import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import ExitIcon from '../../../assets/icons/exitIcon.svg';
import GlobalStyles from '../../../styles/GlobalStyle';
import Disconnected from './cases/Disconnected';
import Connected from './cases/Connected';
import Connecting from './cases/Connecting';
import {useDispatch, useSelector} from 'react-redux';
import {
  connectToNetwork,
  requestLocationPermission,
} from '../../../redux/connectionSlice';
import Error from './cases/Error';
import SignalIcon from '../../../assets/svg/connect.svg';
import CustomButton from '../../Button';

const ConnectionModal = ({modalVisible, setModalVisible, setSelected}) => {
  const dispatch = useDispatch();
  const {networkStatus} = useSelector(state => state.connection);

  const handleConnectionEnd = async () => {
    setModalVisible(!modalVisible);
    setSelected('Central');
  };

  const handleConnect = () => {
    dispatch(connectToNetwork());
  };

  useEffect(() => {
    dispatch(requestLocationPermission());
  }, [dispatch]);

  const renderContent = () => {
    switch (networkStatus) {
      case 'disconnected':
        return <Disconnected />;

      case 'connecting':
        return <Connecting />;

      case 'error':
        return <Error />;

      case 'connected':
        return <Connected />;

      default:
        return <Error />;
    }
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
        <View style={GlobalStyles.connectionModalContent}>
          <View style={GlobalStyles.modalHeader}>
            <Text style={GlobalStyles.modalTitle}>
              {networkStatus === 'connecting'
                ? 'Estado de conexión'
                : 'Vincular Central'}
            </Text>
            <TouchableOpacity onPress={() => handleConnectionEnd()}>
              <ExitIcon width={16} height={16} />
            </TouchableOpacity>
          </View>
          {(networkStatus === 'connected' ||
            networkStatus === 'disconnected') && (
            <View style={styles.modalTextContainer}>
              <Text style={GlobalStyles.modalText}>
                Verifica que la central está encendida.
              </Text>
              <Text style={GlobalStyles.modalText}>
                Luego, conéctese a la red wifi.
              </Text>
            </View>
          )}
          {renderContent()}

          {networkStatus !== 'connecting' && (
            <View style={styles.buttonsContainer}>
              {networkStatus !== 'connected' && (
                <CustomButton
                  type="secondary"
                  title={'Cancelar'}
                  onPress={handleConnectionEnd}
                />
              )}
              <CustomButton
                size="medium"
                icon={<SignalIcon />}
                type="primary"
                title={
                  networkStatus === 'connected'
                    ? 'Aceptar'
                    : networkStatus === 'disconnected'
                    ? 'Conectar a la red'
                    : 'Reintentar'
                }
                onPress={
                  networkStatus !== 'connected'
                    ? handleConnect
                    : handleConnectionEnd
                }
              />
            </View>
          )}
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

export default ConnectionModal;
