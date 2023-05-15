import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import {
  CAREER_SECTION_DATA,
  DELETE_CAREER_SECTION,
  CAREER_SEC_DETAIL_PAGE,
} from "./type";
import { PER_PAGE_LIMIT } from "constants/AppConstant";

export const getCareerSection = createAsyncThunk(
  CAREER_SECTION_DATA,
  async (usersListData, thunkAPI) => {
    const { page } = usersListData;
    try {
      const response = await axiosInstance.post(
        `api/career/getcareer?page=${page}&limit=${PER_PAGE_LIMIT}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteCareerSection = createAsyncThunk(
  DELETE_CAREER_SECTION,
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.post("api/career/delete", {
        id,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getCareerSecById = createAsyncThunk(
  CAREER_SEC_DETAIL_PAGE,
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`api/career/${productId}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const careerSectionSlice = createSlice({
  name: "careerSectionSlice",
  initialState: {
    getCareerSectionListData: [],
    getCareerSecData: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCareerSection.pending, (state) => {
      state.getCareerSectionListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getCareerSection.fulfilled, (state, action) => {
      state.getCareerSectionListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getCareerSection.rejected, (state, action) => {
      state.getCareerSectionListData = [];
      state.isFetching = false;
      state.isError = true;
    });
    // //
    builder.addCase(getCareerSecById.pending, (state) => {
      state.getCareerSecData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getCareerSecById.fulfilled, (state, action) => {
      state.getCareerSecData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getCareerSecById.rejected, (state, action) => {
      state.getCareerSecData = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default careerSectionSlice.reducer;
