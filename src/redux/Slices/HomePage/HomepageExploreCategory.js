import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import {
  GET_EXPLORE_CATEGORY,
  DELETE_HOMEPAGE_EXPLORE_CATEGORY,
  HOMEPAGE_EXPLORE_CATEGORY_DETAIL_PAGE,
  ADD_HOMEPAGE_EXPLORE_CAT,
} from "./type";
import { PER_PAGE_LIMIT } from "constants/AppConstant";

export const getHomePageExploreCat = createAsyncThunk(
  GET_EXPLORE_CATEGORY,
  async (usersListData, thunkAPI) => {
    const { page } = usersListData;
    try {
      const response = await axiosInstance.post(
        `api/explorecategory/getexplorecategory?page=${page}&limit=${PER_PAGE_LIMIT}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteHomepageExploreCategory = createAsyncThunk(
  DELETE_HOMEPAGE_EXPLORE_CATEGORY,
  async (cId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/explorecategory/delete`, {
        id: cId,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getHomePageExploreCatById = createAsyncThunk(
  HOMEPAGE_EXPLORE_CATEGORY_DETAIL_PAGE,
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `api/explorecategory/${productId}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addHomepageExploreCat = createAsyncThunk(
  ADD_HOMEPAGE_EXPLORE_CAT,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/explorecategory/create`,
        payload
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const homepageExploreCategorySlice = createSlice({
  name: "homepageExploreCategorySlice",
  initialState: {
    getExploreCategoryListData: [],
    getHomepageexploreCatData: [],
    addNewHomepageExploreCategoryDatass:[],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHomePageExploreCat.pending, (state) => {
      state.getExploreCategoryListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getHomePageExploreCat.fulfilled, (state, action) => {
      state.getExploreCategoryListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getHomePageExploreCat.rejected, (state, action) => {
      state.getExploreCategoryListData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //
    builder.addCase(getHomePageExploreCatById.pending, (state) => {
      state.getHomepageexploreCatData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getHomePageExploreCatById.fulfilled, (state, action) => {
      state.getHomepageexploreCatData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getHomePageExploreCatById.rejected, (state, action) => {
      state.getHomepageexploreCatData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //
    builder.addCase(addHomepageExploreCat.pending, (state) => {
      state.addNewHomepageExploreCategoryDatass = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(addHomepageExploreCat.fulfilled, (state, action) => {
      state.addNewHomepageExploreCategoryDatass = action.payload?.data;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(addHomepageExploreCat.rejected, (state, action) => {
      state.addNewHomepageExploreCategoryDatass = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default homepageExploreCategorySlice.reducer;
