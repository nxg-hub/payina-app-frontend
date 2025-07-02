// Slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  loan: [],
  loading: false,
  error: false,
  success: false,
  scheduleSuccess: false,
  loanSchedule: [],
  scheduleLoading: false,
  loanId: '',
  loanName: '',
  loanHistory: [],
  loanHistoryLoading: false,
};
export const fetchLoan = createAsyncThunk(
  'loan/fetchLoan',

  async ({ newAuthToken }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_GET_LOAN}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newAuthToken}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();

        return data;
      }
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.message || 'Something went wrong');
    }
  }
);

export const fetchLoanSchedule = createAsyncThunk(
  'loanSchedule/fetchLoanSchedule',

  async ({ newAuthToken, id }, { rejectWithValue }) => {
    try {
      return await fetch(
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_GET_LOAN_SCHEDULE}`.replace(
          '{id}',
          id
        ),
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newAuthToken}`,
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

export const fetchLoanHistory = createAsyncThunk(
  'loanHistory/fetchLoanHistory',

  async ({ newAuthToken, id }, { rejectWithValue }) => {
    try {
      return await fetch(
        `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_GET_LOAN_HISTORY}`.replace(
          '{id}',
          id
        ),
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${newAuthToken}`,
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
const loanSlice = createSlice({
  name: 'loan',
  initialState,
  reducers: {
    resetLoan(state) {
      state.loan = [];
      state.success = false;
      state.loanSchedule = [];
      state.loanId = '';
      state.scheduleSuccess = false;
      state.loanSchedule = [];
      state.scheduleLoading = false;
      state.loanId = '';
      state.loanName = '';
      state.loanHistory = [];
      state.loanHistoryLoading = false;
    },
    getLoanId(state, action) {
      const { id, loanName } = action.payload;
      state.loanId = id;
      state.loanName = loanName;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoan.fulfilled, (state, action) => {
        state.loading = false;
        state.loan = action.payload;
        state.success = true;
      })
      .addCase(fetchLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.loan = [];
        state.success = false;
      })
      .addCase(fetchLoanSchedule.pending, (state) => {
        state.scheduleLoading = true;
        state.error = null;
      })
      .addCase(fetchLoanSchedule.fulfilled, (state, action) => {
        state.scheduleLoading = false;
        state.loanSchedule = action.payload;
        state.success = true;
      })
      .addCase(fetchLoanSchedule.rejected, (state, action) => {
        state.scheduleLoading = false;
        state.error = true;
        state.loanSchedule = [];
        state.success = false;
      })
      .addCase(fetchLoanHistory.pending, (state) => {
        state.loanHistoryLoading = true;
        state.error = null;
      })
      .addCase(fetchLoanHistory.fulfilled, (state, action) => {
        state.loanHistoryLoading = false;
        state.loanHistory = action.payload;
        state.success = true;
      })
      .addCase(fetchLoanHistory.rejected, (state, action) => {
        state.loanHistoryLoading = false;
        state.error = true;
        state.loanHistory = [];
        state.success = false;
      });
  },
});

export const { resetLoan, getLoanId } = loanSlice.actions;
export default loanSlice.reducer;
