import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import { RESET_PASSWORD_LINK } from "./type";

export const resetPasswordLink = createAsyncThunk(
  RESET_PASSWORD_LINK,
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "api/requestpasswordreset",
        data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState: {
    isLoggedIn: false,
    isFetching: false,
    data: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resetPasswordLink.pending, (state) => {
      state.data = {};
      state.isFetching = true;
    });

    builder.addCase(resetPasswordLink.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoggedIn = true;
      state.isFetching = false;
    });
    builder.addCase(resetPasswordLink.rejected, (state, action) => {
      state.data = {};
      state.isLoggedIn = false;
      state.isFetching = false;
    });
  },
});

export default resetPasswordSlice.reducer;
