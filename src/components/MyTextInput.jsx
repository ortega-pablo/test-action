import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native';
import GlobalStyles from '../styles/GlobalStyle';

const MyTextInput = ({
  placeholder,
  editable = true,
  onChangeText,
  value,
  withoutStyles,
}) => {
  const [isFocused, setFocus] = useState(false);

  useEffect(() => {
    if (value) {
      setFocus(true);
    }
  }, [value]);

  return (
    <TextInput
      style={
        isFocused ? GlobalStyles.formTextInputFocus : GlobalStyles.formTextInput
      }
      placeholder={placeholder}
      editable={editable}
      onFocus={() => setFocus(true)} // Establecer el enfoque en true al comenzar a escribir
      onBlur={() => {
        if (!value) {
          setFocus(false);
        }
      }}
      onChangeText={text => {
        setFocus(true);
        onChangeText(text);
      }}
      value={value}
    />
  );
};

export default MyTextInput;
