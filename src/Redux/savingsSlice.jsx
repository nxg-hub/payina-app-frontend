// Slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  savings: [],
  loading: false,
  error: false,
  success: false,
  savingsId: '',
  savingsName: '',
};
export const fetchSavings = createAsyncThunk(
  'savings/fecthSavings',

  async (token, { rejectWithValue }) => {
    try {
      return await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_GET_SAVINGS}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          return data;
        });
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.message || 'Something went wrong');
    }
  }
);
const savingsSlice = createSlice({
  name: 'savings',
  initialState,
  reducers: {
    resetsavings(state, action) {
      state.savings = [];
      state.success = false;
      state.savingsId = '';
      state.savingsName = '';
    },
    getSavingsId(state, action) {
      const { id, goalName } = action.payload;
      state.savingsId = id;
      state.savingsName = goalName;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavings.fulfilled, (state, action) => {
        state.loading = false;
        state.savings = action.payload;
        state.success = true;
      })
      .addCase(fetchSavings.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.savings = [];
        state.success = false;
      });
  },
});

export const { resetsavings, getSavingsId } = savingsSlice.actions;
export default savingsSlice.reducer;
