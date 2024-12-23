// Slice
import {
  createSlice,
  // createAsyncThunk
} from '@reduxjs/toolkit';

const initialState = {
  step: 0,
  //   success: false,
};

const businessSignUpSlice = createSlice({
  name: 'businessSignUp',
  initialState,
  reducers: {
    nextStep(state) {
      state.step = state.step + 1; //  handle next step
      console.log(state.step);
      //   state.success = true;
    },
    resetState(state) {
      state.step = 0;
    },
  },
  extraReducers: (builder) => {},
});

export const { nextStep, resetState } = businessSignUpSlice.actions;
export default businessSignUpSlice.reducer;
