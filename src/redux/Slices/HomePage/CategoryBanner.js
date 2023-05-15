import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import {
  GET_CATEGORY_BANNER,
  DELETE_CATEGORY_BANNER,
  CATEGORY_BANNER_DETAIL_PAGE,
  ADD_CATEGORY_BANNER,
  EDIT_CATEGORY_BANNER,
} from "./type";
import { PER_PAGE_LIMIT } from "constants/AppConstant";

export const getCategoryBanners = createAsyncThunk(
  GET_CATEGORY_BANNER,
  async (usersListData, thunkAPI) => {
    try {
      const { page } = usersListData;
      const response = await axiosInstance.post(
        `api/categorybanner/getcategorybanners?page=${page}&limit=${PER_PAGE_LIMIT}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteCategoryBanner = createAsyncThunk(
  DELETE_CATEGORY_BANNER,
  async (cId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/categorybanner/delete`, {
        id: cId,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getCategoryBannerDetail = createAsyncThunk(
  CATEGORY_BANNER_DETAIL_PAGE,
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `api/categorybanner/${productId}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addNewCategoryBanner = createAsyncThunk(
  ADD_CATEGORY_BANNER,
  async (addCategoryBannerDatas, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/categorybanner/create`,
        addCategoryBannerDatas
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const editCategoryBanner = createAsyncThunk(
  EDIT_CATEGORY_BANNER,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `api/categorybanner/update`,
        payload
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const categoryBannerSlice = createSlice({
  name: "categoryBannerSlice",
  initialState: {
    getCategoryBannersListingData: [],
    getCategoryBannerData: [],
    addNewCategoryBannerDatass: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategoryBanners.pending, (state) => {
      state.getCategoryBannersListingData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getCategoryBanners.fulfilled, (state, action) => {
      state.getCategoryBannersListingData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getCategoryBanners.rejected, (state, action) => {
      state.getCategoryBannersListingData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //
    //
    builder.addCase(getCategoryBannerDetail.pending, (state) => {
      state.getCategoryBannerData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getCategoryBannerDetail.fulfilled, (state, action) => {
      state.getCategoryBannerData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getCategoryBannerDetail.rejected, (state, action) => {
      state.getCategoryBannerData = [];
      state.isFetching = false;
      state.isError = true;
    });

    //
    builder.addCase(addNewCategoryBanner.pending, (state) => {
      state.addNewCategoryBannerDatass = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(addNewCategoryBanner.fulfilled, (state, action) => {
      state.addNewCategoryBannerDatass = action.payload?.data;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(addNewCategoryBanner.rejected, (state, action) => {
      state.addNewCategoryBannerDatass = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default categoryBannerSlice.reducer;
