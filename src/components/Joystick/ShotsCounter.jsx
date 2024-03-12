import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {neutral600, orangeYellow} from '../../styles/GlobalStyle';
import RobotIcon from '../../assets/svg/robot.svg';
import {useSelector} from 'react-redux';

const ShotCounter = () => {
  const {isBeaten, hits, oldHits, totalHits} = useSelector(
    state => state.robotStatics,
  );
  const [addHits, setAddHits] = useState(false);

  useEffect(() => {
    if (isBeaten) {
      setAddHits(true);
      setTimeout(() => {
        setAddHits(false);
      }, 1500);
    }
  }, [isBeaten]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <RobotIcon width={24} height={24} style={styles.icon} />
        <Text style={styles.text2}>Robot 1</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Impactos recibidos: </Text>
        {addHits ? (
          <>
            <Text style={styles.text2}>{oldHits}</Text>
            <Text style={styles.text3}>{` + ${hits}`}</Text>
          </>
        ) : (
          <>
            <Text style={styles.text2}>{totalHits}</Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: 328,
    height: 80,
    justifyContent: 'center',
    borderRadius: 2,
  },
  textContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    padding: 4,
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
  text3: {
    fontSize: 14,
    fontFamily: 'Goldman-Regular',
    color: orangeYellow,
  },
  icon: {
    marginRight: 16,
  },
});
export default ShotCounter;
