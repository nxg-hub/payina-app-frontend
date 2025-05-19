// Slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  inventory: [],
  loading: false,
  error: false,
  success: false,
};
export const fetchInventory = createAsyncThunk(
  'inventory/fecthInventory',

  async (id, { rejectWithValue }) => {
    try {
      return await fetch(
       `${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_GET_INVENTORY_BY_CUSTOMER_ID}`.replace('{customerId}', id),
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
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
const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    storeUpdatedInventory(state, action) {
      state.inventory = action.payload; // Store fetched data in the state
      state.success = true;
    },
    resetInventory(state, action) {
      state.inventory = [];
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.inventory = action.payload;
        state.success = true;
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.inventory = [];
        state.success = false;
      });
  },
});

export const { storeUpdatedInventory, resetInventory } = inventorySlice.actions;
export default inventorySlice.reducer;
