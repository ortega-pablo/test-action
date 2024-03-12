import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import WifiManager from 'react-native-wifi-reborn';
import {PERMISSIONS, request} from 'react-native-permissions';
import {connect as connectSocket} from '../utils/socket.js';
import NetInfo from '@react-native-community/netinfo';

const mySSID = 'ESP32-JOY';
const myPass = '123456789';

export const requestLocationPermission = createAsyncThunk(
  'connectivity/requestLocationPermission',
  async () => {
    const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    return result === 'granted';
  },
);

export const connectToNetwork = createAsyncThunk(
  'connectivity/connectToNetwork',
  async (_, {rejectWithValue}) => {
    // Espera 3 segundos antes de iniciar la conexión
    await new Promise(resolve => setTimeout(resolve, 3000));
    try {
      // Verifica si el WiFi está encendido
      const wifiState = await NetInfo.fetch();
      console.log('WIFI INFO', wifiState);
      if (!wifiState.isWifiEnabled) {
        throw new Error('WiFi is not enabled');
      }

      if (wifiState.isConnected) {
        // Obtiene el SSID de la red WiFi a la que estás conectado actualmente
        const currentSSID = await WifiManager.getCurrentWifiSSID();
        console.log('currentSSID: ', currentSSID);
        if (currentSSID !== mySSID && currentSSID !== null) {
          // Si no estás conectado a la red correcta, desconéctate
          const isDisconnected = await WifiManager.disconnect();
          console.log('isDisconnected: ', isDisconnected);
        }

        if (currentSSID === mySSID) {
          console.log('SSID CORRECTO');
          const socketStatus = await connectSocket();
          return {networkStatus: 'connected', socketStatus};
        }
      }
      // Intenta conectarte a la red correcta
      const result = await connectWithTimeout(mySSID, myPass).catch(err => {
        throw new Error(err);
      });
      console.log('Connection result: ', result);
      if (result === 'connected') {
        const socketStatus = await connectSocket();
        return {networkStatus: 'connected', socketStatus};
      } else {
        throw new Error(result);
      }
    } catch (error) {
      console.log('error: ', error);
      if (error.message === 'Not connected or connecting') {
        return rejectWithValue(
          'Failed to connect to the WiFi network. Please check that the network is available and try again.',
        );
      } else {
        return rejectWithValue(error);
      }
    }
  },
);
const connectWithTimeout = (ssid, password) => {
  return new Promise((resolve, reject) => {
    // Inicia la conexión
    const connectPromise = WifiManager.connectToProtectedSSID(
      ssid,
      password,
      false,
      false,
    );

    // Establece un tiempo de espera
    const timeoutPromise = new Promise((_, rejectTimeout) => {
      setTimeout(() => {
        rejectTimeout('Connection attempt timed out');
      }, 10000); // Tiempo de espera de 10 segundos
    });

    // Usa Promise.race para que se resuelva/rechace la promesa que se complete primero
    Promise.race([connectPromise, timeoutPromise]).then(resolve).catch(reject);
  });
};

const connectionSlice = createSlice({
  name: 'connection',
  initialState: {
    networkStatus: 'disconnected',
    socketStatus: 'disconnected',
    errorMessage: '',
  },
  reducers: {
    setSocketStatus: (state, action) => {
      state.socketStatus = action.payload;
    },
    setNetworkStatus: (state, action) => {
      state.networkStatus = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(connectToNetwork.pending, state => {
        state.networkStatus = 'connecting';
        state.socketStatus = 'pending';
        state.errorMessage = null;
      })
      .addCase(connectToNetwork.fulfilled, (state, action) => {
        state.networkStatus = action.payload.networkStatus;
        state.socketStatus = action.payload.socketStatus;
        state.errorMessage = null;
      })
      .addCase(connectToNetwork.rejected, (state, action) => {
        state.networkStatus = 'error';
        state.socketStatus = 'error';
        console.log('action: ', action);
        state.errorMessage = action.payload;
      });
  },
});

export const {setSocketStatus, setNetworkStatus} = connectionSlice.actions;

export default connectionSlice.reducer;
