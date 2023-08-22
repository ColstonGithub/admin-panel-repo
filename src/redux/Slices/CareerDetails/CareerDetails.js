import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import {
  CAREER_DETAILS_DATA,
  ADD_CAREER_DETAILS,
  EDIT_CAREER_DETAILS,
  DELETE_CAREER_DETAILS,
  CAREER_DETAILS_DETAIL_PAGE,
} from "./type";
import { PER_PAGE_LIMIT } from "constants/AppConstant";

export const getCareerDetailData = createAsyncThunk(
  CAREER_DETAILS_DATA,
  async (usersListData, thunkAPI) => {
    const { page } = usersListData;
    try {
      const response = await axiosInstance.get(
        `api/careerDetails/getCareerDetails?page=${page}&limit=${PER_PAGE_LIMIT}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addCareerDetails = createAsyncThunk(
  ADD_CAREER_DETAILS,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/careerDetails/create`, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const editCareerDetails = createAsyncThunk(
  EDIT_CAREER_DETAILS,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`api/careerDetails/update`, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteCareerDetails = createAsyncThunk(
  DELETE_CAREER_DETAILS,
  async (cId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/careerDetails/delete`, {
        id: cId,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getCareerDetailsById = createAsyncThunk(
  CAREER_DETAILS_DETAIL_PAGE,
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`api/careerDetails/${id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const careerDetailsSlice = createSlice({
  name: "careerDetailsSlice",
  initialState: {
    getCareerDetailsListData: [],
    getCareerDetailsData: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCareerDetailData.pending, (state) => {
      state.getCareerDetailsListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getCareerDetailData.fulfilled, (state, action) => {
      state.getCareerDetailsListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getCareerDetailData.rejected, (state, action) => {
      state.getCareerDetailsListData = [];
      state.isFetching = false;
      state.isError = true;
    });

    builder.addCase(getCareerDetailsById.pending, (state) => {
      state.getCareerDetailsData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getCareerDetailsById.fulfilled, (state, action) => {
      state.getCareerDetailsData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getCareerDetailsById.rejected, (state, action) => {
      state.getCareerDetailsData = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default careerDetailsSlice.reducer;
