import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import {
  GET_EXHIBITION_PAGE,
  EXHIBITION_PAGE_DETAIL_PAGE,
  DELETE_EXHIBITION_PAGE,
  ADD_EXHIBITION_PAGE,
  EDIT_EXHIBITION_PAGE,
} from "./type";
import { PER_PAGE_LIMIT } from "constants/AppConstant";

export const getExhibitionPage = createAsyncThunk(
  GET_EXHIBITION_PAGE,
  async (usersListData, thunkAPI) => {
    const { page } = usersListData;
    try {
      const response = await axiosInstance.get(
        `api/exhibitionproduct/getexhibitionproducts?page=${page}&limit=${PER_PAGE_LIMIT}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getExhibitionPageDetail = createAsyncThunk(
  EXHIBITION_PAGE_DETAIL_PAGE,
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `api/exhibitionproduct/${productId}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const editExhibitionPage = createAsyncThunk(
  EDIT_EXHIBITION_PAGE,
  async (addBrandPage, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `api/exhibitionproduct/update`,
        addBrandPage
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteExhibitionPage = createAsyncThunk(
  DELETE_EXHIBITION_PAGE,
  async (exhibitionProductId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/exhibitionproduct/delete`,
        {
          exhibitionProductId: exhibitionProductId,
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addExhibitionPage = createAsyncThunk(
  ADD_EXHIBITION_PAGE,
  async (addBrandPageData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/exhibitionproduct/create`,
        addBrandPageData
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const exhibitionPageSlice = createSlice({
  name: "exhibitionPageSlice",
  initialState: {
    getExhibitionPageListData: [],
    getExhibitionCenterData: [],
    addExhibitionPageData: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getExhibitionPage.pending, (state) => {
      state.getExhibitionPageListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getExhibitionPage.fulfilled, (state, action) => {
      state.getExhibitionPageListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getExhibitionPage.rejected, (state, action) => {
      state.getExhibitionPageListData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //

    builder.addCase(getExhibitionPageDetail.pending, (state) => {
      state.getExhibitionCenterData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getExhibitionPageDetail.fulfilled, (state, action) => {
      state.getExhibitionCenterData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getExhibitionPageDetail.rejected, (state, action) => {
      state.getExhibitionCenterData = [];
      state.isFetching = false;
      state.isError = true;
    });
    builder.addCase(addExhibitionPage.pending, (state) => {
      state.addExhibitionPageData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(addExhibitionPage.fulfilled, (state, action) => {
      state.addExhibitionPageData = action.payload?.data;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(addExhibitionPage.rejected, (state, action) => {
      state.addExhibitionPageData = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});
export default exhibitionPageSlice.reducer;
