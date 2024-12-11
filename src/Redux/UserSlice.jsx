// Slice
import {
  createSlice,
  // createAsyncThunk
} from '@reduxjs/toolkit';

const initialState = {
  user: [],
  success: false,
};

const userSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    fetchDataSuccess(state, action) {
      state.user = action.payload; // Store fetched data in the state
      state.success = true;
    },
    updateProfilePicture(state, action) {
      state.user.passportUrl = action.payload; // Only update the profile picture
    },
    reSetUserDetails(state, action) {
      state.user = [];
      state.success = false;
    },
  },
  extraReducers: (builder) => {},
});

export const { fetchDataSuccess, updateProfilePicture, reSetUserDetails } = userSlice.actions;
export default userSlice.reducer;
