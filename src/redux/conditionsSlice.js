import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getConditions} from '../db/dbFunctions/conditions';

export const getCondition = createAsyncThunk(
  'condition/getConditions',
  async () => {
    try {
      const conditions = (await getConditions()).data;
      return conditions;
    } catch (error) {
      console.error('Error al obtener condiciones:', error);
      throw error;
    }
  },
);

// export const updateConditionAsync = createAsyncThunk(
//   'condition/updateConditions',
//   async ({conditionId, updateConditionData}) => {
//     try {
//       const conditions = await updateCondition(
//         conditionId,
//         updateConditionData,
//       );
//       return conditions;
//     } catch (error) {
//       console.error('Error al obtener condiciones:', error);
//       throw error;
//     }
//   },
// );

const conditionSlice = createSlice({
  name: 'condition',
  initialState: {
    condition: {},
  },
  extraReducers: builder => {
    builder.addCase(getCondition.fulfilled, (state, action) => {
      state.condition = action.payload;
    });
  },
});

export default conditionSlice.reducer;
