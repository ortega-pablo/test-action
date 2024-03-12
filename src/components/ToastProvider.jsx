import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ToastProvider} from 'react-native-toast-notifications';
import SuccessIcon from '../assets/svg/success.svg';
import {ghostWhite, jet, orangeYellow} from '../styles/GlobalStyle';

const CustomToastProvider = ({children}) => {
  return (
    <ToastProvider
      placement="bottom"
      duration={3000}
      animationType="slide-in"
      animationDuration={250}
      swipeEnabled={true}
      offsetBottom={40}
      offset={150}
      renderType={{
        customSuccess: toast => (
          <View style={styles.toastContainer}>
            <View style={styles.icon}>
              <SuccessIcon />
            </View>
            <Text style={styles.text}>{toast.message}</Text>
          </View>
        ),
      }}>
      {children}
    </ToastProvider>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: ghostWhite,
    padding: 16,
    borderWidth: 2,
    borderColor: orangeYellow,
    alignItems: 'center',
    width: 532,
  },
  text: {
    fontFamily: 'andalemo',
    color: jet,
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
});

export default CustomToastProvider;
