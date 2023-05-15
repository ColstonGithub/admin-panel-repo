import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const login = createAsyncThunk("auth/checkLogin", async (user, thunkAPI) => {
  try {
    return await axios.get(
      'https://jsonplaceholder.typicode.com/users/1/',
    )
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    isFetching: false,
    data: {},
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.data = {};
      state.isFetching = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoggedIn = true;
      state.isFetching = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.data = {};
      state.isLoggedIn = false;
      state.isFetching = false;
    });
  },
});

export default authSlice.reducer;
