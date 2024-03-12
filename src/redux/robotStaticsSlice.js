import {createSlice} from '@reduxjs/toolkit';

const robotStaticsSlice = createSlice({
  name: 'robotStatics',
  initialState: {
    signal: 0,
    isBeaten: false,
    hits: 0,
    oldHits: 0,
    totalHits: 0,
  },
  reducers: {
    setSignal: (state, action) => {
      state.signal = action.payload;
    },
    addHits: (state, action) => {
      state.hits = action.payload;
      state.isBeaten = true;
      state.oldHits = state.totalHits;
      state.totalHits += action.payload;
    },
    setHits: (state, action) => {
      state.hits += action.payload;
    },
    resetHits: (state, action) => {
      state.hits = 0;
      state.oldHits = 0;
      state.totalHits = 0;
    },
    resetIsBeaten: (state, action) => {
      state.isBeaten = false;
    },
  },
});

export const {setSignal, setHits, addHits, resetIsBeaten, resetHits} =
  robotStaticsSlice.actions;

export default robotStaticsSlice.reducer;
