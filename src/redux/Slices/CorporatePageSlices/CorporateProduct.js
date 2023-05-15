import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import {
  GET_CORPORATE_PRODUCT,
  DELETE_CORPORATE_PRODUCT,
  ADD_CORPORATE_PRODUCT,
  CORPORATE_PRODUCT_DETAIL_PAGE,
  EDIT_CORPORATE_PRODUCT,
} from "./type";
import { PER_PAGE_LIMIT } from "constants/AppConstant";

export const getcorporateProducts = createAsyncThunk(
  GET_CORPORATE_PRODUCT,
  async (usersListData, thunkAPI) => {
    const { page } = usersListData;
    try {
      const response = await axiosInstance.get(
        `api/corporateproduct/getcorporateproducts?page=${page}&limit=${PER_PAGE_LIMIT}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteCorporateProduct = createAsyncThunk(
  DELETE_CORPORATE_PRODUCT,
  async (cId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/corporateproduct/delete`, {
        id: cId,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getCorporateProductDetail = createAsyncThunk(
  CORPORATE_PRODUCT_DETAIL_PAGE,
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `api/corporateproduct/${productId}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addNewCorporateProduct = createAsyncThunk(
  ADD_CORPORATE_PRODUCT,
  async (addCatalogueDatas, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/corporateproduct/create`,
        addCatalogueDatas
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const editCorporateProduct = createAsyncThunk(
  EDIT_CORPORATE_PRODUCT,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `api/corporateproduct/update`,
        payload
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const corporateProductSlice = createSlice({
  name: "corporateProductSlice",
  initialState: {
    getCorporateProductListData: [],
    getCorporateProductData: [],
    addCorporateProductDatass: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getcorporateProducts.pending, (state) => {
      state.getCorporateProductListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getcorporateProducts.fulfilled, (state, action) => {
      state.getCorporateProductListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getcorporateProducts.rejected, (state, action) => {
      state.getCorporateProductListData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //
    builder.addCase(getCorporateProductDetail.pending, (state) => {
      state.getCorporateProductData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getCorporateProductDetail.fulfilled, (state, action) => {
      state.getCorporateProductData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getCorporateProductDetail.rejected, (state, action) => {
      state.getCorporateProductData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //
    builder.addCase(addNewCorporateProduct.pending, (state) => {
      state.addCorporateProductDatass = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(addNewCorporateProduct.fulfilled, (state, action) => {
      state.addCorporateProductDatass = action.payload?.data;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(addNewCorporateProduct.rejected, (state, action) => {
      state.addCorporateProductDatass = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default corporateProductSlice.reducer;
