import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import {
  WARRANTY_REGISTRATION_DATA,
  DELETE_REGISTRATION_DATA,
  WARRANTY_REG_DETAIL_PAGE,
} from "./type";
import { PER_PAGE_LIMIT } from "constants/AppConstant";

export const getWarrantyRegistration = createAsyncThunk(
  WARRANTY_REGISTRATION_DATA,
  async (usersListData, thunkAPI) => {
    const { page } = usersListData;
    try {
      const response = await axiosInstance.post(
        `api/warrentyregistration/getwarrentyregistration?page=${page}&limit=${PER_PAGE_LIMIT}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteWarrantyRegistration = createAsyncThunk(
  DELETE_REGISTRATION_DATA,
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "api/warrentyregistration/delete",
        {
          id,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getWarrantyRegById = createAsyncThunk(
  WARRANTY_REG_DETAIL_PAGE,
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `api/warrentyregistration/${productId}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const warrantyRegistrationSlice = createSlice({
  name: "warrantyRegistrationSlice",
  initialState: {
    getWarrantyRegistrationListData: [],
    getWarrantyRegData: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWarrantyRegistration.pending, (state) => {
      state.getWarrantyRegistrationListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getWarrantyRegistration.fulfilled, (state, action) => {
      state.getWarrantyRegistrationListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getWarrantyRegistration.rejected, (state, action) => {
      state.getWarrantyRegistrationListData = [];
      state.isFetching = false;
      state.isError = true;
    });
    // //
    builder.addCase(getWarrantyRegById.pending, (state) => {
      state.getWarrantyRegData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getWarrantyRegById.fulfilled, (state, action) => {
      state.getWarrantyRegData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getWarrantyRegById.rejected, (state, action) => {
      state.getWarrantyRegData = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default warrantyRegistrationSlice.reducer;
