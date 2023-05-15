import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import { SETUP_PASSWORD } from "./type";

export const setupPassword = createAsyncThunk(
  SETUP_PASSWORD,
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post("api/resetpassword", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.response.data });
    }
  }
);

const passwordSetup = createSlice({
  name: "users",
  initialState: {
    responce: null,
    errors: {},
  },
  reduces: {},
  extraReducers: (builders) => {
    builders.addCase(setupPassword.pending, (state) => {});
    builders.addCase(setupPassword.fulfilled, (state, action) => {
      state.responce = action?.payload;
      state.errors = {};
    });
    builders.addCase(setupPassword.rejected, (state, action) => {
      state.errors = action?.payload?.error;
    });
  },
});

export default passwordSetup.reducer;
