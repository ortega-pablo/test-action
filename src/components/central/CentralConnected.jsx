import {View, Text, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import GlobalStyles from '../../styles/GlobalStyle';
import CustomButton from '../Button';
import robotsList from '../../assets/robots-example.json';
import RobotsListItem from '../RobotsListItem';
import Connected from './connectionModal/cases/Connected';

const CentralConnected = ({handleDisconnect}) => {
  return (
    <>
      <Text style={GlobalStyles.title}>Estado de robots</Text>
      <FlatList
        data={robotsList}
        renderItem={({item}) => <RobotsListItem item={item} />}
        keyExtractor={item => item.id}
        style={styles.dataGrid}
      />
      <Text style={[GlobalStyles.textAndalemo, styles.textContainer]}>
        Tené en cuenta que si desconectas la central no podrás realizar un
        entrenamiento hasta que vuelvas a conectar la misma.
      </Text>
      <View style={styles.statusBoxContainer}>
        <Connected />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title={'Desconectar'}
          type={'primary'}
          size={'medium'}
          onPress={handleDisconnect}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  dataGrid: {
    height: 372,
    width: 792,
  },
  textContainer: {
    marginBottom: 32,
    marginTop: 8,
  },
  statusBoxContainer: {
    width: 480,
  },
  buttonContainer: {
    alignSelf: 'flex-end',
  },
});

export default CentralConnected;
