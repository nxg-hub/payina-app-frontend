// Slice
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wallet: '',
};

const walletSlice = createSlice({
  name: 'walletDetails',
  initialState,
  reducers: {
    setWalletBalance(state, action) {
      state.wallet = action.payload; // Store fetched data in the state
    },

    reSetWalletDetails(state, action) {
      state.wallet = '';
    },
  },
  extraReducers: (builder) => {},
});

export const { setWalletBalance, reSetWalletDetails } = walletSlice.actions;
export default walletSlice.reducer;
