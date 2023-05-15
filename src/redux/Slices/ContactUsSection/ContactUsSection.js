import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import {
  CONTACT_US_SECTION_DATA,
  DELETE_ABOUT_US_SECTION,
  CONTACT_US_SEC_DETAIL_PAGE,
} from "./type";
import { PER_PAGE_LIMIT } from "constants/AppConstant";

export const getContactUsSection = createAsyncThunk(
  CONTACT_US_SECTION_DATA,
  async (usersListData, thunkAPI) => {
    const { page } = usersListData;
    try {
      const response = await axiosInstance.post(
        `api/contactus/getcontactus?page=${page}&limit=${PER_PAGE_LIMIT}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteAboutUsSection = createAsyncThunk(
  DELETE_ABOUT_US_SECTION,
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.post("api/contactus/delete", {
        id,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getContactUsSecById = createAsyncThunk(
  CONTACT_US_SEC_DETAIL_PAGE,
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`api/contactus/${productId}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const contactUsSectionSlice = createSlice({
  name: "contactUsSectionSlice",
  initialState: {
    getContactUsSectionListData: [],
    getContactUsSecData: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContactUsSection.pending, (state) => {
      state.getContactUsSectionListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getContactUsSection.fulfilled, (state, action) => {
      state.getContactUsSectionListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getContactUsSection.rejected, (state, action) => {
      state.getContactUsSectionListData = [];
      state.isFetching = false;
      state.isError = true;
    });
    // //
    builder.addCase(getContactUsSecById.pending, (state) => {
      state.getContactUsSecData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getContactUsSecById.fulfilled, (state, action) => {
      state.getContactUsSecData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getContactUsSecById.rejected, (state, action) => {
      state.getContactUsSecData = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default contactUsSectionSlice.reducer;
