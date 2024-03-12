import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Image} from 'react-native-elements';
import userImage from '../assets/images/user-image.jpeg';
import GlobalStyles from '../styles/GlobalStyle';
import StatusIconGreen from '../assets/icons/statusIconGreen.svg';
import StatusIconRed from '../assets/icons/statusIconRed.svg';
import {useSelector} from 'react-redux';

const menuItems = [
  {name: 'Central'},
  {name: 'Condiciones'},
  {name: 'Evaluaciones', subMenu: ['Nuevo', 'Reportes']},
  {name: 'Tiradores'},
];

const SideBar = ({selected, onSelect}) => {
  const {networkStatus} = useSelector(state => state.connection);
  const [showSubMenu, setShowSubMenu] = useState(false);

  return (
    <View style={GlobalStyles.sidebarContainer}>
      <View style={GlobalStyles.sidebarProfile}>
        <Text style={GlobalStyles.sidebarUserName}>Alexa Siri</Text>
        <Image source={userImage} style={GlobalStyles.sidebarUserImage} />
      </View>
      {menuItems.map((item, index) => (
        <View key={index}>
          {item.subMenu ? (
            // Renderiza una View si hay submenú
            <TouchableOpacity
              style={GlobalStyles.sidebarPrimaryOption}
              onPress={() => setShowSubMenu(!showSubMenu)}>
              <Text style={GlobalStyles.sidebarOptionText}>{item.name}</Text>
              <Image
                source={require('../assets/images/down-arrow.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          ) : (
            // Renderiza TouchableOpacity si no hay submenú
            <TouchableOpacity
              style={[
                GlobalStyles.sidebarPrimaryOption,
                selected === item.name && GlobalStyles.sidebarSelectedOption,
              ]}
              onPress={() => onSelect(item.name)}>
              <Text
                style={[
                  GlobalStyles.sidebarOptionText,
                  selected === item.name &&
                    GlobalStyles.sidebarSelectedOptionText,
                ]}>
                {item.name}
              </Text>
              {item.name === 'Central' &&
                (networkStatus === 'connected' ? (
                  <StatusIconGreen width={24} height={24} />
                ) : (
                  <StatusIconRed width={24} height={24} />
                ))}
            </TouchableOpacity>
          )}

          {item.subMenu &&
            showSubMenu &&
            item.subMenu.map((subItem, subIndex) => (
              <TouchableOpacity
                key={subIndex}
                style={[
                  GlobalStyles.sidebarSecondaryOptoin,
                  selected === subItem && GlobalStyles.sidebarSelectedOption,
                ]}
                onPress={() => onSelect(subItem)}>
                <Text
                  style={[
                    GlobalStyles.sidebarOptionText,
                    selected === subItem &&
                      GlobalStyles.sidebarSelectedOptionText,
                  ]}>
                  {subItem}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 12,
    height: 7,
    resizeMode: 'contain',
  },
});
export default SideBar;
