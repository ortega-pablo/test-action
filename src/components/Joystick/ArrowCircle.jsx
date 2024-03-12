import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {arrowRed, green2} from '../../styles/GlobalStyle';
import LocationArrow from '../../assets/svg/location-arrow-1.svg';
import {useSelector} from 'react-redux';

const ArrowCircle = () => {
  const {isBeaten} = useSelector(state => state.robotStatics);
  const [bgColor, setBgColor] = useState(green2);

  useEffect(() => {
    if (isBeaten) {
      setBgColor(arrowRed);
      setTimeout(() => {
        setBgColor(green2);
      }, 1500);
    }
  }, [isBeaten]);

  return (
    <View style={[styles.circle, {backgroundColor: bgColor}]}>
      <View style={styles.innerView}>
        <LocationArrow />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 200,
  },
  innerView: {
    height: '100%',
  },
});

export default ArrowCircle;
