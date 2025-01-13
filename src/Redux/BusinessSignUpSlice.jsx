// Slice
import {
  createSlice,
  // createAsyncThunk
} from '@reduxjs/toolkit';

const initialState = {
  step: 0,
  token: '',
  sameAddress: '',
};

const businessSignUpSlice = createSlice({
  name: 'businessSignUp',
  initialState,
  reducers: {
    nextStep(state) {
      state.step = state.step + 1; //  handle next step
    },
    previousStep(state) {
      state.step = state.step - 1; //  handle previous step
    },
    setStep(state, action) {
      state.step = action.payload;
    },
    resetState(state) {
      state.step = 0;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    resetToken(state) {
      state.token = null;
    },
    setAddress(state, action) {
      state.sameAddress = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { nextStep, resetState, setStep, setToken, resetToken, previousStep, setAddress } =
  businessSignUpSlice.actions;
export default businessSignUpSlice.reducer;
