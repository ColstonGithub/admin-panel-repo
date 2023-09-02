import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import {
  ORIENTATION_DATA,
  ADD_ORIENTATION,
  EDIT_ORIENTATION,
  DELETE_ORIENTATION,
  ORIENTATION_DETAIL_PAGE,
} from "./type";
import { PER_PAGE_LIMIT } from "constants/AppConstant";

export const getOrientationCenterData = createAsyncThunk(
  ORIENTATION_DATA,
  async (usersListData, thunkAPI) => {
    const { page } = usersListData;
    try {
      const response = await axiosInstance.get(
        `api/orientationCenter/getOrientationCenters?page=${page}&limit=${PER_PAGE_LIMIT}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteOrientationCenter = createAsyncThunk(
  DELETE_ORIENTATION,
  async (cId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/orientationCenter/delete`,
        {
          id: cId,
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const orientationCenterDetail = createAsyncThunk(
  ORIENTATION_DETAIL_PAGE,
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`api/orientationCenter/${id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addOrientationCenter = createAsyncThunk(
  ADD_ORIENTATION,
  async (formData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/orientationCenter/create`,
        formData
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const editOrientationCenter = createAsyncThunk(
  EDIT_ORIENTATION,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `api/orientationCenter/update`,
        payload
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const orientationCenterSlice = createSlice({
  name: "orientationCenterSlice",
  initialState: {
    getOrientationCenterListData: [],
    getOrientationCenterData: [],
    addOrientationCenterData: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrientationCenterData.pending, (state) => {
      state.getOrientationCenterListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getOrientationCenterData.fulfilled, (state, action) => {
      state.getOrientationCenterListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getOrientationCenterData.rejected, (state, action) => {
      state.getOrientationCenterListData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //
    builder.addCase(orientationCenterDetail.pending, (state) => {
      state.getOrientationCenterData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(orientationCenterDetail.fulfilled, (state, action) => {
      state.getOrientationCenterData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(orientationCenterDetail.rejected, (state, action) => {
      state.getOrientationCenterData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //
    builder.addCase(addOrientationCenter.pending, (state) => {
      state.addOrientationCenterData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(addOrientationCenter.fulfilled, (state, action) => {
      state.addOrientationCenterData = action.payload?.data;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(addOrientationCenter.rejected, (state, action) => {
      state.addOrientationCenterData = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default orientationCenterSlice.reducer;
