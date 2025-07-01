// Slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  statement: [],
  loading: false,
  error: false,
  success: false,
};
export const fetchSavingStatement = createAsyncThunk(
  'savingsStatement/fetchSavingStatement',

  async ({ id, token }, { rejectWithValue }) => {
    try {
      return await fetch(
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_GET_SAVINGS_STATEMENT}`.replace(
          '{id}',
          id
        ),
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
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
const savingsStatementSlice = createSlice({
  name: 'savingsStatement',
  initialState,
  reducers: {
    resetSavingStatement(state) {
      state.statement = [];
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavingStatement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavingStatement.fulfilled, (state, action) => {
        state.loading = false;
        state.statement = action.payload;
        state.success = true;
      })
      .addCase(fetchSavingStatement.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.statement = [];
        state.success = false;
      });
  },
});

export const { resetSavingStatement } = savingsStatementSlice.actions;
export default savingsStatementSlice.reducer;
