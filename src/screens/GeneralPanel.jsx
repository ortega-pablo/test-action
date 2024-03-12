import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import SideBar from '../components/Sidebar';
import CentralComponent from '../components/central/CentralComponent';
import {useSelector} from 'react-redux';
import AdminsPannel from '../components/admins/AdminsPannel';
import ShootersPannel from '../components/shooters/ShootersPannel';
import SVGBackground from '../components/Background';
import NewTest from '../components/NewTest';
import Report from '../components/Reports';
import Condition from '../components/Conditions';

const GeneralPanel = ({route}) => {
  const [selected, setSelected] = useState('Central');
  useEffect(() => {}, [selected]);

  const {networkStatus} = useSelector(state => state.connection);

  useEffect(() => {
    if (!networkStatus) {
      setSelected('NotConnected');
    }
    if (route?.params?.selected) {
      setSelected(route?.params?.selected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [networkStatus]);

  let content;
  switch (selected) {
    case 'Central':
      content = <CentralComponent setSelected={setSelected} />;
      break;
    case 'Condiciones':
      content = <Condition />;
      break;
    case 'Nuevo':
      content = <NewTest />;
      break;
    case 'Reportes':
      content = <Report />;
      break;
    case 'Administradores':
      content = <AdminsPannel />;
      break;
    case 'Tiradores':
      content = <ShootersPannel />;
      break;
    default:
      content = null;
  }

  return (
    <SVGBackground>
      <View style={styles.container}>
        <SideBar selected={selected} onSelect={setSelected} />
        <View style={styles.content}>{content}</View>
      </View>
    </SVGBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default GeneralPanel;
