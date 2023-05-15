import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import {
  GET_CORPORATE_BANNER,
  DELETE_CORPORATE_BANNER,
  ADD_CORPORATE_BANNER,
  CORPORATE_BANNER_DETAIL_PAGE,
} from "./type";
import { PER_PAGE_LIMIT } from "constants/AppConstant";

export const getcorporateBanner = createAsyncThunk(
  GET_CORPORATE_BANNER,
  async (usersListData, thunkAPI) => {
    const { page } = usersListData;
    try {
      const response = await axiosInstance.post(
        `api/corporatepagebanner/getcorporatepagebanners?page=${page}&limit=${PER_PAGE_LIMIT}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteCorporateBanner = createAsyncThunk(
  DELETE_CORPORATE_BANNER,
  async (cId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/corporatepagebanner/delete`,
        {
          id: cId,
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getCorporateBannerDetail = createAsyncThunk(
  CORPORATE_BANNER_DETAIL_PAGE,
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `api/corporatepagebanner/${productId}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addNewCorporateBanner = createAsyncThunk(
  ADD_CORPORATE_BANNER,
  async (addCatalogueDatas, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/corporatepagebanner/create`,
        addCatalogueDatas
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const editCorporateBanner = createAsyncThunk(
  ADD_CORPORATE_BANNER,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `api/corporatepagebanner/update`,
        payload
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const corporateBannerSlice = createSlice({
  name: "corporateBannerSlice",
  initialState: {
    getCorporateBannerListData: [],
    getCorporateBannerData: [],
    addCorporateBannerDatass: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getcorporateBanner.pending, (state) => {
      state.getCorporateBannerListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getcorporateBanner.fulfilled, (state, action) => {
      state.getCorporateBannerListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getcorporateBanner.rejected, (state, action) => {
      state.getCorporateBannerListData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //
    builder.addCase(getCorporateBannerDetail.pending, (state) => {
      state.getCorporateBannerData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getCorporateBannerDetail.fulfilled, (state, action) => {
      state.getCorporateBannerData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getCorporateBannerDetail.rejected, (state, action) => {
      state.getCorporateBannerData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //
    builder.addCase(addNewCorporateBanner.pending, (state) => {
      state.addCorporateBannerDatass = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(addNewCorporateBanner.fulfilled, (state, action) => {
      state.addCorporateBannerDatass = action.payload?.data;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(addNewCorporateBanner.rejected, (state, action) => {
      state.addCorporateBannerDatass = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default corporateBannerSlice.reducer;
