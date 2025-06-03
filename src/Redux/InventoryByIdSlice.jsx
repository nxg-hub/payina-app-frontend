// Slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  inventoryById: [],
  loading: false,
  error: false,
};
export const fetchInventoryById = createAsyncThunk(
  'inventoryById/fecthInventoryById',

  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}${import.meta.env.VITE_GET_INVENTORY_BY_ID}`.replace('{id}', id), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        return data;
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      return rejectWithValue(err.message || 'Something went wrong');
    }
  }
);
const inventoryByIdSlice = createSlice({
  name: 'inventoryById',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInventoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.inventoryById = action.payload;
      })
      .addCase(fetchInventoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.inventoryById = [];
      });
  },
});

// export const { fetchDataSuccess, updateProfilePicture, reSetUserDetails } = inventoryByIdSlice.actions;
export default inventoryByIdSlice.reducer;
