import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import { GET_INITIAL_IMAGES_ADMIN } from "./type";

export const getInitialImagesAdmin = createAsyncThunk(
  GET_INITIAL_IMAGES_ADMIN,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `api/initialImageAdmin/getInitialImagesAdmin`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const InitialImagesAdminSlice = createSlice({
  name: "InitialImagesAdminSlice",
  initialState: {
    initialImagesAdmin: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInitialImagesAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInitialImagesAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.initialImagesAdmin = action.payload;
      })
      .addCase(getInitialImagesAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export default InitialImagesAdminSlice.reducer;
