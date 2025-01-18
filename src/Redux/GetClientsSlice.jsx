// Slice
import {
  createSlice,
  // createAsyncThunk
} from '@reduxjs/toolkit';

const initialState = {
  clients: [],
  success: false,
  filterLoader: false,
};

const clientsSlice = createSlice({
  name: 'ClientsDetails',
  initialState,
  reducers: {
    fetchClientSuccess(state, action) {
      state.clients = action.payload; // Store fetched data in the state
      state.success = true;
    },

    reSetClientsDetails(state, action) {
      state.clients = [];
      state.success = false;
    },
    setFilterLoader(state, action) {
      state.filterLoader = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { fetchClientSuccess, reSetClientsDetails, setFilterLoader } = clientsSlice.actions;
export default clientsSlice.reducer;
