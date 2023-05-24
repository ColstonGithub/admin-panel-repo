import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import {
  CARE_CLEAN_DATA,
  DELETE_CARE_CLEAN,
  CARE_CLEAN_DETAIL_PAGE,
  ADD_CARE_CLEAN,
  EDIT_CARE_AND_CLEAN,
} from "./type";
import { PER_PAGE_LIMIT } from "constants/AppConstant";

export const getCareClean = createAsyncThunk(
  CARE_CLEAN_DATA,
  async (usersListData, thunkAPI) => {
    const { page } = usersListData;
    try {
      const response = await axiosInstance.post(
        `api/careclean/getcarecleans?page=${page}&limit=${PER_PAGE_LIMIT}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteCareClean = createAsyncThunk(
  DELETE_CARE_CLEAN,
  async (cId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/careclean/delete`, {
        id: cId,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getCareCleanDetail = createAsyncThunk(
  CARE_CLEAN_DETAIL_PAGE,
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`api/careclean/${productId}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addCareClean = createAsyncThunk(
  ADD_CARE_CLEAN,
  async (addCareCleanData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/careclean/create`,
        addCareCleanData
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const editCareAndClean = createAsyncThunk(
  EDIT_CARE_AND_CLEAN,
  async (editVirtualTour, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `api/careclean/update`,
        editVirtualTour
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const careCleanSlice = createSlice({
  name: "careCleanSlice",
  initialState: {
    getCareCleanListData: [],
    getCareCleanData: [],
    addCareCleanData: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCareClean.pending, (state) => {
      state.getCareCleanListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getCareClean.fulfilled, (state, action) => {
      state.getCareCleanListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getCareClean.rejected, (state, action) => {
      state.getCareCleanListData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //
    builder.addCase(getCareCleanDetail.pending, (state) => {
      state.getCareCleanData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getCareCleanDetail.fulfilled, (state, action) => {
      state.getCareCleanData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getCareCleanDetail.rejected, (state, action) => {
      state.getCareCleanData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //

    builder.addCase(addCareClean.pending, (state) => {
      state.addCareCleanData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(addCareClean.fulfilled, (state, action) => {
      state.addCareCleanData = action.payload?.data;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(addCareClean.rejected, (state, action) => {
      state.addCareCleanData = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default careCleanSlice.reducer;
