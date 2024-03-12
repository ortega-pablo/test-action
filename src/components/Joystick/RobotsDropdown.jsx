import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {jet, neutral800} from '../../styles/GlobalStyle';

const data = [
  {label: 'Robot 1', value: '1'},
  {label: 'Robot 2', value: '2'},
];

const DropdownComponent = () => {
  const [value, setValue] = useState('1');

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      itemTextStyle={styles.itemTextStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Seleccionar robot"
      searchPlaceholder="Buscar..."
      value={value}
      onChange={item => {
        setValue(item.value);
      }}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: 54,
    width: 328,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    backgroundColor: 'white',
    padding: 16,
    alignItems: 'center',
    borderRadius: 2,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'Goldman-Regular',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: neutral800,
    fontFamily: 'Goldman-Regular',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontFamily: 'andalemo',
  },
  itemTextStyle: {
    color: jet,
    fontFamily: 'andalemo',
  },
});
