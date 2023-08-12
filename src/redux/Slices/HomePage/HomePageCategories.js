import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import {
  GET_HOMEPAGE_CATEGORIES,
  ADD_HOMEPAGE_CATEGORY,
  DELETE_CATEGORY,
  CATEGORY_DETAIL_PAGE,
  GET_HOMEPAGE_BANNERS,
  ADD_HOMEPAGE_BANNER,
  DELETE_BANNER,
  BANNER_DETAIL_PAGE,
  EDIT_HOMEPAGE_BANNER,
  EDIT_HOMEPAGE_CATEGORY,
} from "./type";
import { PER_PAGE_LIMIT } from "constants/AppConstant";

export const getHomePageCategories = createAsyncThunk(
  GET_HOMEPAGE_CATEGORIES,
  async (thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `api/category/getcategory`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addHomepageBanner = createAsyncThunk(
  ADD_HOMEPAGE_CATEGORY,
  async (addBannerData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/category/create`,
        addBannerData
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

// edit
export const editHomepageCategory = createAsyncThunk(
  EDIT_HOMEPAGE_CATEGORY,
  async (addBannerData, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `api/category/update`,
        addBannerData
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteCategory = createAsyncThunk(
  DELETE_CATEGORY,
  async (idPayload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/category/delete`, {
        payload: idPayload,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getCategoriesDetail = createAsyncThunk(
  CATEGORY_DETAIL_PAGE,
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `api/category/getcategory/${id}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

// homepage banner

export const getHomePageBanners = createAsyncThunk(
  GET_HOMEPAGE_BANNERS,
  async (usersListData, thunkAPI) => {
    try {
      const { page } = usersListData;
      const response = await axiosInstance.post(
        `api/banner/getBanners?page=${page}&limit=${PER_PAGE_LIMIT}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getBannersDetail = createAsyncThunk(
  BANNER_DETAIL_PAGE,
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`api/banner/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addHomepageBannerMain = createAsyncThunk(
  ADD_HOMEPAGE_BANNER,
  async (addBannerData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/banner/create`,
        addBannerData
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const editHomepageBannerMain = createAsyncThunk(
  EDIT_HOMEPAGE_BANNER,
  async (addBannerData, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `api/banner/update`,
        addBannerData
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteBanner = createAsyncThunk(
  DELETE_BANNER,
  async (bannerId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/banner/deleteBannerById`, {
        bannerId,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const exploreCategoriesSlice = createSlice({
  name: "exploreCategoriesSlice",
  initialState: {
    getCategoriesListData: [],
    getHomepageBannerData: [],
    getHomepageBannerMainData: [],
    getBannersListingData: [],
    getParticularBannerData: {},
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHomePageCategories.pending, (state) => {
      state.getCategoriesListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getHomePageCategories.fulfilled, (state, action) => {
      state.getCategoriesListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getHomePageCategories.rejected, (state, action) => {
      state.getCategoriesListData = [];
      state.isFetching = false;
      state.isError = true;
    });
    builder.addCase(addHomepageBanner.pending, (state) => {
      state.getHomepageBannerData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(addHomepageBanner.fulfilled, (state, action) => {
      state.getHomepageBannerData = action.payload?.data;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(addHomepageBanner.rejected, (state, action) => {
      state.getHomepageBannerData = [];
      state.isFetching = false;
      state.isError = true;
    });

    builder.addCase(getCategoriesDetail.pending, (state) => {
      state.getProductsListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getCategoriesDetail.fulfilled, (state, action) => {
      state.getProductsListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getCategoriesDetail.rejected, (state, action) => {
      state.getProductsListData = [];
      state.isFetching = false;
      state.isError = true;
    });

    // banners apis
    builder.addCase(getHomePageBanners.pending, (state) => {
      state.getBannersListingData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getHomePageBanners.fulfilled, (state, action) => {
      state.getBannersListingData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getHomePageBanners.rejected, (state, action) => {
      state.getBannersListingData = [];
      state.isFetching = false;
      state.isError = true;
    });

    builder.addCase(addHomepageBannerMain.pending, (state) => {
      state.getHomepageBannerMainData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(addHomepageBannerMain.fulfilled, (state, action) => {
      state.getHomepageBannerMainData = action.payload?.data;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(addHomepageBannerMain.rejected, (state, action) => {
      state.getHomepageBannerMainData = [];
      state.isFetching = false;
      state.isError = true;
    });

    builder.addCase(getBannersDetail.pending, (state) => {
      state.getParticularBannerData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getBannersDetail.fulfilled, (state, action) => {
      state.getParticularBannerData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getBannersDetail.rejected, (state, action) => {
      state.getParticularBannerData = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default exploreCategoriesSlice.reducer;
