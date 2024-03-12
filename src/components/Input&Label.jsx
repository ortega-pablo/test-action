import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {
  neutral400,
  neutral800,
  orangeYellow,
  white,
} from '../styles/GlobalStyle';

const CustomInput = ({
  labelTitle,
  placeHolderText,
  onChangeText,
  isPasswordType = false,
  autoCapitalize = 'sentences',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.formLabel}>{labelTitle}</Text>
      <TextInput
        style={isFocused ? styles.focusedTextInput : styles.formTextInput}
        onChangeText={onChangeText}
        placeholder={placeHolderText}
        secureTextEntry={isPasswordType}
        autoCapitalize={autoCapitalize}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginTop: 24,
  },
  formTextInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: neutral400,
    borderRadius: 2,
    backgroundColor: white,
    marginVertical: 4,
    fontFamily: 'andalemo',
    paddingLeft: 8,
    paddingTop: 12,
    color: neutral800,
  },
  focusedTextInput: {
    width: '100%',
    borderWidth: 3,
    borderColor: orangeYellow,
    borderRadius: 2,
    backgroundColor: white,
    marginVertical: 4,
    fontFamily: 'andalemo',
    paddingLeft: 8,
    paddingTop: 12,
    color: neutral800,
  },
  formLabel: {
    fontFamily: 'Goldman-Regular',
    fontSize: 20,
    color: orangeYellow,
    alignSelf: 'flex-start',
  },
});

export default CustomInput;
