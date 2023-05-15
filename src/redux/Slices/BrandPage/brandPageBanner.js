import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import {
  BRAND_PAGE_BANNER_DATA,
  DELETE_BRAND_PAGE_BANNER,
  BRAND_PAGE_BANNER_DETAIL_PAGE,
  ADD_BRAND_PAGE_BANNER,
  EDIT_BRAND_PAGE_BANNER_DATA,
} from "./type";
import { PER_PAGE_LIMIT } from "constants/AppConstant";

export const getBrandPageBanner = createAsyncThunk(
  BRAND_PAGE_BANNER_DATA,
  async (usersListData, thunkAPI) => {
    const { page } = usersListData;
    try {
      const response = await axiosInstance.post(
        `api/brandpagebanner/getbrandpagebanners?page=${page}&limit=${PER_PAGE_LIMIT}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteBrandPageBanner = createAsyncThunk(
  DELETE_BRAND_PAGE_BANNER,
  async (cId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/brandpagebanner/delete`, {
        id: cId,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getBrandPageBannerDetail = createAsyncThunk(
  BRAND_PAGE_BANNER_DETAIL_PAGE,
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `api/brandpagebanner/${productId}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const editBrandPageBannerDetail = createAsyncThunk(
  EDIT_BRAND_PAGE_BANNER_DATA,
  async (formData, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `api/brandpagebanner/update`,
        formData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addNewBrandPageBanner = createAsyncThunk(
  ADD_BRAND_PAGE_BANNER,
  async (addCatalogueDatas, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/brandpagebanner/create`,
        addCatalogueDatas
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const brandPageBannerSlice = createSlice({
  name: "brandPageBannerSlice",
  initialState: {
    getCareCleanListData: [],
    getBrandPageBannerData: [],
    addNewBrandPageBannerDatass: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBrandPageBanner.pending, (state) => {
      state.getCareCleanListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getBrandPageBanner.fulfilled, (state, action) => {
      state.getCareCleanListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getBrandPageBanner.rejected, (state, action) => {
      state.getCareCleanListData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //
    builder.addCase(getBrandPageBannerDetail.pending, (state) => {
      state.getBrandPageBannerData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getBrandPageBannerDetail.fulfilled, (state, action) => {
      state.getBrandPageBannerData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getBrandPageBannerDetail.rejected, (state, action) => {
      state.getBrandPageBannerData = [];
      state.isFetching = false;
      state.isError = true;
    });

    //
    builder.addCase(addNewBrandPageBanner.pending, (state) => {
      state.addNewBrandPageBannerDatass = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(addNewBrandPageBanner.fulfilled, (state, action) => {
      state.addNewBrandPageBannerDatass = action.payload?.data;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(addNewBrandPageBanner.rejected, (state, action) => {
      state.addNewBrandPageBannerDatass = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default brandPageBannerSlice.reducer;
