import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {jet, orangeYellow} from '../styles/GlobalStyle';

const CustomButton = ({
  size = 'small',
  type = 'primary',
  onPress,
  icon,
  title,
  cornerCut = false,
}) => {
  const buttonStyle =
    type === 'primary'
      ? [
          styles.primaryButton,
          size === 'small'
            ? styles.smallButton
            : size === 'large'
            ? styles.largeButton
            : styles.mediumButton,
        ]
      : [
          styles.secondaryButton,
          size === 'small'
            ? styles.smallButton
            : size === 'large'
            ? styles.largeButton
            : styles.mediumButton,
        ];

  const textStyle =
    type === 'primary' ? styles.primaryButtonText : styles.secondaryButtonText;

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: orangeYellow,
    borderRadius: 2,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 2,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  smallButton: {
    width: 127,
  },
  mediumButton: {
    width: 'auto',
  },
  largeButton: {
    width: '100%',
  },
  primaryButtonText: {
    color: jet,
    fontSize: 16,
    letterSpacing: 0.14,
    fontFamily: 'Goldman-Regular',
  },
  secondaryButtonText: {
    color: jet,
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.14,
    fontFamily: 'Goldman-Regular',
  },
  icon: {
    width: 12,
    height: 12,
    marginRight: 8,
  },
});

export default CustomButton;
