import store from '../redux/store';
import {addHits, resetIsBeaten, setSignal} from '../redux/robotStaticsSlice';
import {setSocketStatus, setNetworkStatus} from '../redux/connectionSlice';

let socket;

export async function connect() {
  return new Promise((resolve, reject) => {
    socket = new WebSocket('ws://10.10.10.1:81');

    socket.onopen = () => {
      console.log('Conectado al servidor');
      resolve('socketConnected');
    };

    socket.onmessage = event => {
      const [methodName, argsString] = event.data.split(':');

      switch (methodName) {
        case 'signal':
          console.log('signal: ', argsString);
          store.dispatch(setSignal(Number(argsString)));
          break;
        case 'tgt':
          console.log('tgt: ', argsString);
          store.dispatch(addHits(Number(argsString)));
          setTimeout(() => {
            store.dispatch(resetIsBeaten());
            resolve();
          }, 10);
          break;
        default:
          console.log('Nombre de método desconocido:', methodName);
      }
    };

    socket.onclose = event => {
      console.log('Desconectado del servidor:', event.code, event.reason);
      store.dispatch(setSocketStatus('disconnected'));
      store.dispatch(setNetworkStatus('disconnected'));
    };

    socket.onerror = error => {
      console.log('Error al conectar:', error);
      reject('socketError');
    };
  });
}

export function sendData(dataSended) {
  return new Promise((resolve, reject) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(dataSended);
      resolve('dataSent');
    } else {
      reject('socketNotOpen');
    }
  });
}

export function closeConnection() {
  return new Promise((resolve, reject) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.close();
      store.dispatch(setSocketStatus('disconnected'));
      store.dispatch(setNetworkStatus('disconnected'));
      resolve('connectionClosed');
    } else {
      reject('socketNotOpen');
    }
  });
}
