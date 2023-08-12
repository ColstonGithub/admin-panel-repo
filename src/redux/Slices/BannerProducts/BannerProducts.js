import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import {
  GET_BANNER_PRODUCTS,
  BANNER_PRODUCT_DETAIL_PAGE,
  DELETE_BANNER_PRODUCT,
  ADD_PRODUCT,
  EDIT_PRODUCT,
} from "./type";
import { PER_PAGE_LIMIT } from "constants/AppConstant";

export const getBannerProducts = createAsyncThunk(
  GET_BANNER_PRODUCTS,
  async (usersListData, thunkAPI) => {
    try {
      const { page } = usersListData;
      const response = await axiosInstance.post(
        `api/product/getProducts?page=${page}&limit=${PER_PAGE_LIMIT}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getBannerProductDetail = createAsyncThunk(
  BANNER_PRODUCT_DETAIL_PAGE,
  async (productId, thunkAPI) => {
    try {
      console.log("response ", productId);
      const response = await axiosInstance.get(`api/product/${productId}`);
      console.log("ress ", response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteProduct = createAsyncThunk(
  DELETE_BANNER_PRODUCT,
  async (productId, thunkAPI) => {
    // const payload = { idPayload };
    try {
      const response = await axiosInstance.post(
        `api/product/deleteProductById`,
        {
          productId: productId,
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addProducts = createAsyncThunk(
  ADD_PRODUCT,
  async (addProductData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/product/create`,
        addProductData
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const editProducts = createAsyncThunk(
  EDIT_PRODUCT,
  async (editProductData, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `api/product/update`,
        editProductData
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const brandProductSlice = createSlice({
  name: "brandProductSlice",
  initialState: {
    getBannerProductsListData: [],
    getBannerProductData: [],
    addProductData: [],
    editProductData: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBannerProducts.pending, (state) => {
      state.getBannerProductsListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getBannerProducts.fulfilled, (state, action) => {
      state.getBannerProductsListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getBannerProducts.rejected, (state, action) => {
      state.getBannerProductsListData = [];
      state.isFetching = false;
      state.isError = true;
    });
    builder.addCase(getBannerProductDetail.pending, (state) => {
      state.getBannerProductData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getBannerProductDetail.fulfilled, (state, action) => {
      state.getBannerProductData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getBannerProductDetail.rejected, (state, action) => {
      state.getBannerProductData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //
    builder.addCase(addProducts.pending, (state) => {
      state.addProductData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(addProducts.fulfilled, (state, action) => {
      state.addProductData = action.payload?.data;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(addProducts.rejected, (state, action) => {
      state.addProductData = [];
      state.isFetching = false;
      state.isError = true;
    });

    builder.addCase(editProducts.pending, (state) => {
      state.editProductData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(editProducts.fulfilled, (state, action) => {
      state.editProductData = action.payload?.data;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(editProducts.rejected, (state, action) => {
      state.editProductData = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default brandProductSlice.reducer;
