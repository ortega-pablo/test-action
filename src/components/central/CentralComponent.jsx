// CentralComponent.js
import {View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import GlobalStyles from '../../styles/GlobalStyle';
import ConnectionModal from './connectionModal/ConnectionModal';
import CentralDisconnected from './CentralDisconnected';
import CentralConnected from './CentralConnected';
import DisconnectionModal from './connectionModal/DisconnectionModal';

const CentralComponent = ({setSelected}) => {
  const {networkStatus} = useSelector(state => state.connection);
  const [disconnectionModalVisible, setDisconnectionModalVisible] =
    useState(false);
  const [connectionModalVisible, setConnectionModalVisible] = useState(false);

  const handleConnect = () => {
    setConnectionModalVisible(true);
  };

  const handleDisconnect = () => {
    setDisconnectionModalVisible(true);
  };

  useEffect(() => {}, [networkStatus]);

  return (
    <View style={GlobalStyles.panelComponentContainer}>
      {networkStatus !== 'connected' ? (
        <>
          <CentralDisconnected handleConnect={handleConnect} />
        </>
      ) : (
        <>
          <CentralConnected handleDisconnect={handleDisconnect} />
        </>
      )}
      <ConnectionModal
        modalVisible={connectionModalVisible}
        setModalVisible={setConnectionModalVisible}
        setSelected={setSelected}
      />
      <DisconnectionModal
        modalVisible={disconnectionModalVisible}
        setModalVisible={setDisconnectionModalVisible}
        setSelected={setSelected}
      />
    </View>
  );
};

export default CentralComponent;
