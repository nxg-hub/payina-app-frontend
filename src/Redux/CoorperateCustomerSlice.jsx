// Slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  customerDetails: null,
  loading: false,
  error: false,
  success: false,
};
export const fetchCoorperateCustomerDetails = createAsyncThunk(
  'coopertateCustomer/fetchScholarshipUsers',

  async (id) => {
    try {
      return await fetch(
       `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_GET_CORPORATE_CUSTOMER_DETAILS}`.replace('{customerId}', id),
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          return data;
        });
    } catch (err) {
      console.log(err);
    }
  }
);
const corporateCustomerSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    resetCorporate(state, action) {
      state.customerDetails = [];
      state.success = false;
    },
    storeUpdatedProfile(state, action) {
      state.customerDetails = action.payload; // Store fetched data in the state
      state.success = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoorperateCustomerDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoorperateCustomerDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.customerDetails = action.payload;
        state.success = true;
      })
      .addCase(fetchCoorperateCustomerDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.customerDetails = [];
      });
  },
});

export const { resetCorporate, storeUpdatedProfile } = corporateCustomerSlice.actions;
export default corporateCustomerSlice.reducer;
