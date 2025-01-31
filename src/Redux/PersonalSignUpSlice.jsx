// Slice
import {
  createSlice,
  // createAsyncThunk
} from '@reduxjs/toolkit';

const initialState = {
  step: 0,
  manualEntry: false,
};

const personalSignUpSlice = createSlice({
  name: 'personalSignUp',
  initialState,
  reducers: {
    nextStep(state) {
      state.step = state.step + 1; //  handle next step
    },
    previousStep(state) {
      state.step = state.step - 1; //  handle previous step
    },
    setPersonalStep(state, action) {
      state.step = action.payload;
    },
    resetState(state) {
      state.step = 0;
      state.manualEntry = false;
    },
    setManualEntry(state, action) {
      state.manualEntry = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { nextStep, resetState, previousStep, setPersonalStep, setManualEntry } =
  personalSignUpSlice.actions;
export default personalSignUpSlice.reducer;
