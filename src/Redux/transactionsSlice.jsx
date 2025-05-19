import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunks to fetch transactions
export const fetchCredits = createAsyncThunk(
  'transactions/fetchCredits',
  async ({ authToken, page }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_TRANSACTION_HISTORY}?page=${0}&size=${page}`,
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            type: 'CREDIT',
            // page: 0,
            // pageSize: 5,
          }),
        }
      );

      if (!response.ok) throw new Error('Failed to fetch credit transactions');
      const data = await response.json();

      return data.data; // Store only the transactions
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDebits = createAsyncThunk(
  'transactions/fetchDebits',
  async ({ authToken, page }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_TRANSACTION_HISTORY}?page=${0}&size=${page}`,
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            type: 'DEBIT',
            //  page: 0, pageSize: 5
          }),
        }
      );

      if (!response.ok) throw new Error('Failed to fetch debit transactions');
      const data = await response.json();
      return data.data; // Store only the transactions
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
    currentDebitPage: 10,
    currentCreditPage: 10,
    loading: false,
    error: null,
    hasMoreCredit: true,
    hasMoreDebit: true,
  },
  reducers: {
    resetTransactions(state) {
      // Reset state for both credit and debit transactions
      state.credits = [];
      state.debits = [];
      state.currentCreditPage = 1;
      state.currentDebitPage = 1;
      state.hasMoreCredit = true;
      state.hasMoreDebit = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCredits.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCredits.fulfilled, (state, action) => {
        state.loading = false;
        // Deduplicate Credit Transactions
        const newCredits = action.payload.content.filter(
          (newTxn) => !state.credits.some((txn) => txn.id === newTxn.id)
        );
        state.credits = [...state.credits, ...newCredits];
        if (action.payload.last || action.payload.content.length === 50) {
          state.hasMoreCredit = false; // No more data if fewer than 10 items are returned
        }
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
        // Deduplicate debit Transactions
        const newDebits = action.payload.content.filter(
          (newTxn) => !state.debits.some((txn) => txn.id === newTxn.id)
        );
        state.debits = [...state.debits, ...newDebits];
        // state.debits = [...state.debits, ...action.payload.content];
        if (action.payload.last || action.payload.content.length === 50) {
          state.hasMoreDebit = false; // No more data if fewer than 10 items are returned
        }
      })
      .addCase(fetchDebits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { resetTransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;
