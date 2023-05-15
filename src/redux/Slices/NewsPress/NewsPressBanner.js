import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import {
  NEWS_PRESS_BANNER_DATA,
  DELETE_NEWS_PRESS_BANNER,
  NEWS_PRESS_BANNER_DETAIL_PAGE,
  ADD_NEWS_PRESS_BANNER,
  EDIT_NEWS_PRESS_BANNER,
} from "./type";
import { PER_PAGE_LIMIT } from "constants/AppConstant";

export const getNewsPressBanner = createAsyncThunk(
  NEWS_PRESS_BANNER_DATA,
  async (usersListData, thunkAPI) => {
    const { page } = usersListData;
    try {
      const response = await axiosInstance.post(
        `api/newspressbanner/getnewspressbanners?page=${page}&limit=${PER_PAGE_LIMIT}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteNewsPressBanner = createAsyncThunk(
  DELETE_NEWS_PRESS_BANNER,
  async (cId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/newspressbanner/delete`, {
        id: cId,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const newsPressBannerDetail = createAsyncThunk(
  NEWS_PRESS_BANNER_DETAIL_PAGE,
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `api/newspressbanner/${productId}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addNewNewsPressBanner = createAsyncThunk(
  ADD_NEWS_PRESS_BANNER,
  async (addCatalogueDatas, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/newspressbanner/create`,
        addCatalogueDatas
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const editNewsPressBanner = createAsyncThunk(
  EDIT_NEWS_PRESS_BANNER,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `api/newspressbanner/update`,
        payload
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const newsPressBannerSlice = createSlice({
  name: "newsPressBannerSlice",
  initialState: {
    getNewsPressBannerListData: [],
    getNewsPressBannerData: [],
    addNewNewsPressBannerDatass: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNewsPressBanner.pending, (state) => {
      state.getNewsPressBannerListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getNewsPressBanner.fulfilled, (state, action) => {
      state.getNewsPressBannerListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getNewsPressBanner.rejected, (state, action) => {
      state.getNewsPressBannerListData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //
    builder.addCase(newsPressBannerDetail.pending, (state) => {
      state.getNewsPressBannerData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(newsPressBannerDetail.fulfilled, (state, action) => {
      state.getNewsPressBannerData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(newsPressBannerDetail.rejected, (state, action) => {
      state.getNewsPressBannerData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //
    builder.addCase(addNewNewsPressBanner.pending, (state) => {
      state.addNewNewsPressBannerDatass = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(addNewNewsPressBanner.fulfilled, (state, action) => {
      state.addNewNewsPressBannerDatass = action.payload?.data;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(addNewNewsPressBanner.rejected, (state, action) => {
      state.addNewNewsPressBannerDatass = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default newsPressBannerSlice.reducer;
