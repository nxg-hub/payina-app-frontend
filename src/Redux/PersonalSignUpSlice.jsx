// Slice
import {
  createSlice,
  // createAsyncThunk
} from '@reduxjs/toolkit';

const initialState = {
  step: 0,
  //   success: false,
};

const personalSignUpSlice = createSlice({
  name: 'personalSignUp',
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

export const { nextStep, resetState } = personalSignUpSlice.actions;
export default personalSignUpSlice.reducer;
