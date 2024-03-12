import {configureStore} from '@reduxjs/toolkit';
import connectionSlice from './connectionSlice';
import robotStaticsSlice from './robotStaticsSlice';
import userSlice from './userSlice';
import conditionsSlice from './conditionsSlice';

const rootReducer = {
  connection: connectionSlice,
  user: userSlice,
  robotStatics: robotStaticsSlice,
  conditions: conditionsSlice,
  /* feature1: reducer1,
    feature2: reducer2,
    feature3: reducer3,
    feature4: reducer4, */
};

const store = configureStore({
  reducer: rootReducer,
});
export default store;
