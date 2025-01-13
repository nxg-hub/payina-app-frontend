// Slice
import {
  createSlice,
  // createAsyncThunk
} from '@reduxjs/toolkit';

const initialState = {
  passwordToken: '',
  email: '',
};

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    setPasswordToken(state, action) {
      state.passwordToken = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    clearState(state) {
      (state.email = ''), (state.passwordToken = '');
    },
  },
  extraReducers: (builder) => {},
});

export const { setPasswordToken, setEmail, clearState } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
