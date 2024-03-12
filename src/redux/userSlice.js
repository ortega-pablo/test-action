import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {login} from '../db/dbFunctions/auth';
import {getUserByEmail} from '../db/dbFunctions/users';

export const loginUserAsync = createAsyncThunk(
  'user/login',
  async ({email, password}) => {
    try {
      const loginRes = login(email, password);
      return loginRes;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  },
);

export const getUserByEmailAsync = createAsyncThunk(
  'user/getUser',
  async email => {
    try {
      const user = getUserByEmail(email);
      return user;
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      throw error;
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
  },
  extraReducers: builder => {
    builder.addCase(getUserByEmailAsync.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default userSlice.reducer;
