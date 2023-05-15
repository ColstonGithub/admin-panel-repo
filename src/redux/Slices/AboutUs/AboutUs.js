import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import {
  ABOUT_US,
  ADD_ABOUT_US,
  DELETE_ABOUT_US,
  EDIT_ABOUT_US,
  ABOUT_US_DETAIL_PAGE,
} from "./type";
import { PER_PAGE_LIMIT } from "constants/AppConstant";

export const getAboutUsData = createAsyncThunk(
  ABOUT_US,
  async (usersListData, thunkAPI) => {
    const { page } = usersListData;
    try {
      const response = await axiosInstance.post(
        `api/aboutus/getaboutus?page=${page}&limit=${PER_PAGE_LIMIT}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addNewAboutUs = createAsyncThunk(
  ADD_ABOUT_US,
  async (addCatalogueDatas, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/aboutus/create`,
        addCatalogueDatas
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteAboutUs = createAsyncThunk(
  DELETE_ABOUT_US,
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.post("api/aboutus/delete", { id });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const editAboutUs = createAsyncThunk(
  EDIT_ABOUT_US,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.patch("api/aboutus/update", payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getAboutusById = createAsyncThunk(
  ABOUT_US_DETAIL_PAGE,
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`api/aboutus/${productId}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const aboutUsSlice = createSlice({
  name: "aboutUsSlice",
  initialState: {
    getAboutUsListData: [],
    addNewAboutUsDatass: [],
    getAboutUsData: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAboutUsData.pending, (state) => {
      state.getAboutUsListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getAboutUsData.fulfilled, (state, action) => {
      state.getAboutUsListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getAboutUsData.rejected, (state, action) => {
      state.getAboutUsListData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //
    builder.addCase(addNewAboutUs.pending, (state) => {
      state.addNewAboutUsDatass = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(addNewAboutUs.fulfilled, (state, action) => {
      state.addNewAboutUsDatass = action.payload?.data;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(addNewAboutUs.rejected, (state, action) => {
      state.addNewAboutUsDatass = [];
      state.isFetching = false;
      state.isError = true;
    });
    //
    builder.addCase(getAboutusById.pending, (state) => {
      state.getAboutUsData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getAboutusById.fulfilled, (state, action) => {
      state.getAboutUsData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getAboutusById.rejected, (state, action) => {
      state.getAboutUsData = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default aboutUsSlice.reducer;
