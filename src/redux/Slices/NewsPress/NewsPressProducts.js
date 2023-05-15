import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import {
  NEWS_PRESS_PRODUCT_DATA,
  DELETE_NEWS_PRESS_PRODUCT,
  NEWS_PRESS_PRODUCT_DETAIL_PAGE,
  ADD_NEWS_PRESS_PRODUCT,
  EDIT_NEWS_PRESS_PRODUCT,
} from "./type";
import { PER_PAGE_LIMIT } from "constants/AppConstant";

export const getNewsPressProducts = createAsyncThunk(
  NEWS_PRESS_PRODUCT_DATA,
  async (usersListData, thunkAPI) => {
    const { page } = usersListData;
    try {
      const response = await axiosInstance.get(
        `api/newspress/getnewspress?page=${page}&limit=${PER_PAGE_LIMIT}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteNewsPressProduct = createAsyncThunk(
  DELETE_NEWS_PRESS_PRODUCT,
  async (cId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/newspress/delete`, {
        id: cId,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);
export const newsPressProductDetail = createAsyncThunk(
  NEWS_PRESS_PRODUCT_DETAIL_PAGE,
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`api/newspress/${productId}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addNewNewsPressProduct = createAsyncThunk(
  ADD_NEWS_PRESS_PRODUCT,
  async (addCatalogueDatas, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/newspress/create`,
        addCatalogueDatas
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const editNewsPressProduct = createAsyncThunk(
  EDIT_NEWS_PRESS_PRODUCT,
  async (editNewsPressProductData, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `api/newspress/update`,
        editNewsPressProductData
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const newsPressProductSlice = createSlice({
  name: "newsPressProductSlice",
  initialState: {
    getNewsPressProductListData: [],
    getNewsPressProductData: [],
    addNewNewsPressProductDatass: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNewsPressProducts.pending, (state) => {
      state.getNewsPressProductListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getNewsPressProducts.fulfilled, (state, action) => {
      state.getNewsPressProductListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getNewsPressProducts.rejected, (state, action) => {
      state.getNewsPressProductListData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //
    builder.addCase(newsPressProductDetail.pending, (state) => {
      state.getNewsPressProductData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(newsPressProductDetail.fulfilled, (state, action) => {
      state.getNewsPressProductData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(newsPressProductDetail.rejected, (state, action) => {
      state.getNewsPressProductData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //
    builder.addCase(addNewNewsPressProduct.pending, (state) => {
      state.addNewNewsPressProductDatass = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(addNewNewsPressProduct.fulfilled, (state, action) => {
      state.addNewNewsPressProductDatass = action.payload?.data;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(addNewNewsPressProduct.rejected, (state, action) => {
      state.addNewNewsPressProductDatass = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default newsPressProductSlice.reducer;
