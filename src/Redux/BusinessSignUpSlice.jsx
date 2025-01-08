// Slice
import {
  createSlice,
  // createAsyncThunk
} from '@reduxjs/toolkit';

const initialState = {
  step: 0,
};

const businessSignUpSlice = createSlice({
  name: 'businessSignUp',
  initialState,
  reducers: {
    nextStep(state) {
      state.step = state.step + 1; //  handle next step
    },
    setStep(state, action) {
      state.step = action.payload;
    },
    resetState(state) {
      state.step = 0;
    },
  },
  extraReducers: (builder) => {},
});

export const { nextStep, resetState, setStep } = businessSignUpSlice.actions;
export default businessSignUpSlice.reducer;
