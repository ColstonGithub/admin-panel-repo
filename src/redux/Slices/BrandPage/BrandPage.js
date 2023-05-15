import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import {
  GET_BRAND_PAGE,
  BRAND_PAGE_DETAIL_PAGE,
  DELETE_BRAND_PAGE,
  ADD_BRAND_PAGE,
  EDIT_BRAND_PAGE,
} from "./type";
import { PER_PAGE_LIMIT } from "constants/AppConstant";

export const getBrandPage = createAsyncThunk(
  GET_BRAND_PAGE,
  async (usersListData, thunkAPI) => {
    const { page } = usersListData;
    try {
      const response = await axiosInstance.get(
        `api/brandproduct/getbrandproducts?page=${page}&limit=${PER_PAGE_LIMIT}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getBrandPageDetail = createAsyncThunk(
  BRAND_PAGE_DETAIL_PAGE,
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`api/brandproduct/${productId}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const editBrandPage = createAsyncThunk(
  EDIT_BRAND_PAGE,
  async (addBrandPage, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `api/brandproduct/update`,
        addBrandPage
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteBrandPage = createAsyncThunk(
  DELETE_BRAND_PAGE,
  async (brandProductId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/brandproduct/delete`, {
        brandProductId: brandProductId,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addBrandPage = createAsyncThunk(
  ADD_BRAND_PAGE,
  async (addBrandPageData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/brandproduct/create`,
        addBrandPageData
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const brandPageSlice = createSlice({
  name: "brandPageSlice",
  initialState: {
    getBrandPageListData: [],
    getBrandPageData: [],
    addBrandPageData: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBrandPage.pending, (state) => {
      state.getBrandPageListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getBrandPage.fulfilled, (state, action) => {
      state.getBrandPageListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getBrandPage.rejected, (state, action) => {
      state.getBrandPageListData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //

    builder.addCase(getBrandPageDetail.pending, (state) => {
      state.getBrandPageData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getBrandPageDetail.fulfilled, (state, action) => {
      state.getBrandPageData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getBrandPageDetail.rejected, (state, action) => {
      state.getBrandPageData = [];
      state.isFetching = false;
      state.isError = true;
    });
    builder.addCase(addBrandPage.pending, (state) => {
      state.addBrandPageData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(addBrandPage.fulfilled, (state, action) => {
      state.addBrandPageData = action.payload?.data;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(addBrandPage.rejected, (state, action) => {
      state.addBrandPageData = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});
export default brandPageSlice.reducer;
