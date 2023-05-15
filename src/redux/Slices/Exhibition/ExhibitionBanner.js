import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import {
  EXHIBITION_BANNER_LIST,
  DELETE_EXHIBITION_BANNER,
  EXHIBITION_BANNER_DETAIL_PAGE,
  ADD_NEW_EXHIBITION_BANNER,
  EDIT_EXHIBITION_BANNER,
} from "./type";
import { PER_PAGE_LIMIT } from "constants/AppConstant";

export const getExhibitionBanner = createAsyncThunk(
  EXHIBITION_BANNER_LIST,
  async (usersListData, thunkAPI) => {
    const { page } = usersListData;
    try {
      const response = await axiosInstance.post(
        `api/exhibition/getexhibitions?page=${page}&limit=${PER_PAGE_LIMIT}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteExhibitionBanner = createAsyncThunk(
  DELETE_EXHIBITION_BANNER,
  async (cId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/exhibition/delete`, {
        id: cId,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getExhibitionBannerDetail = createAsyncThunk(
  EXHIBITION_BANNER_DETAIL_PAGE,
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`api/exhibition/${productId}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addNewExhibitionBanner = createAsyncThunk(
  ADD_NEW_EXHIBITION_BANNER,
  async (addExhibitionBannerDatas, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/exhibition/create`,
        addExhibitionBannerDatas
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const editExhibitionBanner = createAsyncThunk(
  EDIT_EXHIBITION_BANNER,
  async (editExhibitionBannerData, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `api/exhibition/update`,
        editExhibitionBannerData
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const exhibitionBannerSlice = createSlice({
  name: "exhibitionBannerSlice",
  initialState: {
    getExhibitionBannerListData: [],
    getExhibtionBannerData: [],
    addNewExhibitionBannerDatass: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getExhibitionBanner.pending, (state) => {
      state.getExhibitionBannerListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getExhibitionBanner.fulfilled, (state, action) => {
      state.getExhibitionBannerListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getExhibitionBanner.rejected, (state, action) => {
      state.getExhibitionBannerListData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //
    builder.addCase(getExhibitionBannerDetail.pending, (state) => {
      state.getExhibtionBannerData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getExhibitionBannerDetail.fulfilled, (state, action) => {
      state.getExhibtionBannerData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getExhibitionBannerDetail.rejected, (state, action) => {
      state.getExhibtionBannerData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //
    builder.addCase(addNewExhibitionBanner.pending, (state) => {
      state.addNewExhibitionBannerDatass = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(addNewExhibitionBanner.fulfilled, (state, action) => {
      state.addNewExhibitionBannerDatass = action.payload?.data;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(addNewExhibitionBanner.rejected, (state, action) => {
      state.addNewExhibitionBannerDatass = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default exhibitionBannerSlice.reducer;
