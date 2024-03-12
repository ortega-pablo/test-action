import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen';
import Orientation from 'react-native-orientation-locker';
import GeneralPanel from './src/screens/GeneralPanel';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {setupDatabase} from './src/db/dbConfig';
import Login from './src/screens/Login';
import CustomToastProvider from './src/components/ToastProvider';
import Gamepad from './src/screens/Gamepad';
import {StatusBar} from 'react-native';

const Stack = createStackNavigator();
StatusBar.setHidden(true); // Oculta el notch

const App: React.FC = () => {
  useEffect(() => {
    Orientation.lockToLandscape();
  }, []);
  useEffect(() => {
    setupDatabase();
  }, []);
  return (
    <CustomToastProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="GeneralPanel"
              component={GeneralPanel}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Gamepad"
              component={Gamepad}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </CustomToastProvider>
  );
};

export default App;
