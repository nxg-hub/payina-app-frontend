import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks to fetch transactions
export const fetchCredits = createAsyncThunk(
  'transactions/fetchCredits',
  async (authToken, { rejectWithValue }) => {
    try {
      const response = await fetch(import.meta.env.VITE_TRANSACTION_HISTORY, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ type: 'CREDIT', page: 0, pageSize: 5 }),
      });

      if (!response.ok) throw new Error('Failed to fetch credit transactions');
      const data = await response.json();
      return data.data.content; // Store only the transactions
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDebits = createAsyncThunk(
  'transactions/fetchDebits',
  async (authToken, { rejectWithValue }) => {
    try {
      const response = await fetch(import.meta.env.VITE_TRANSACTION_HISTORY, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ type: 'DEBIT', page: 0, pageSize: 5 }),
      });

      if (!response.ok) throw new Error('Failed to fetch debit transactions');
      const data = await response.json();
      return data.data.content; // Store only the transactions
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    credits: [],
    debits: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCredits.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCredits.fulfilled, (state, action) => {
        state.loading = false;
        state.credits = action.payload;
      })
      .addCase(fetchCredits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDebits.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDebits.fulfilled, (state, action) => {
        state.loading = false;
        state.debits = action.payload;
      })
      .addCase(fetchDebits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionsSlice.reducer;
