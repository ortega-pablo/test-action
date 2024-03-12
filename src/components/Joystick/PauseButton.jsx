import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {grey, orangeYellow} from '../../styles/GlobalStyle';
import LighbulbIcon from '../../assets/svg/lightbulb-fill.svg';
import PauseIcon from '../../assets/svg/pause.svg';
import {sendData} from '../../utils/socket';

const PauseButton = ({type, customStyle, onPress}) => {
  const [backgroundColor, setBackgroundColor] = useState(grey + 'B3');

  const changeBackgroundColor = () => {
    if (backgroundColor === orangeYellow) {
      setBackgroundColor(grey + 'B3');
      sendData('lights:0');
      return;
    }
    setBackgroundColor(orangeYellow);
    sendData('lights:1');
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        customStyle,
        {backgroundColor: type === 'bulb' ? backgroundColor : grey + 'B3'},
      ]}
      onPress={type === 'bulb' ? changeBackgroundColor : onPress}>
      {type === 'bulb' ? <LighbulbIcon /> : <PauseIcon />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 88,
    height: 88,
    borderRadius: 200,

    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 10,
    borderColor: grey + '5F',
  },
});
export default PauseButton;
