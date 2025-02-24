// Slice
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wallet: '',
  vendPayload: [],
};

const walletSlice = createSlice({
  name: 'walletDetails',
  initialState,
  reducers: {
    setWalletBalance(state, action) {
      // state.wallet = action.payload; // Store fetched data in the state
      state.wallet = Math.floor(Number(action.payload));
    },
    setVendPayload(state, action) {
      state.vendPayload = action.payload; // Store fetched data in the state
    },

    reSetWalletDetails(state, action) {
      state.wallet = '';
      state.vendPayload = [];
    },
  },
  extraReducers: (builder) => {},
});

export const { setWalletBalance, reSetWalletDetails, setVendPayload } = walletSlice.actions;
export default walletSlice.reducer;
