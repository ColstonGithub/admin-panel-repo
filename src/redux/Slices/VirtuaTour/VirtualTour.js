import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import {
  VIRTUAL_TOUR_BANNER_DATA,
  DELETE_VIRTUAL_TOUR,
  VIRTUAL_TOUR_DETAIL_PAGE,
  ADD_NEW_VIRTUAL_TOUR,
  EDIT_VIRTUAL_TOUR_BANNER,
} from "./type";
import { PER_PAGE_LIMIT } from "constants/AppConstant";

export const getVirtualTourBanner = createAsyncThunk(
  VIRTUAL_TOUR_BANNER_DATA,
  async (usersListData, thunkAPI) => {
    const { page } = usersListData;
    try {
      const response = await axiosInstance.post(
        `api/virtualtour/getvirtualtours?page=${page}&limit=${PER_PAGE_LIMIT}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteVirtualTour = createAsyncThunk(
  DELETE_VIRTUAL_TOUR,
  async (cId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/virtualtour/delete`, {
        id: cId,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const virtualTourBannerDetail = createAsyncThunk(
  VIRTUAL_TOUR_DETAIL_PAGE,
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`api/virtualtour/${productId}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addNewVirtualTour = createAsyncThunk(
  ADD_NEW_VIRTUAL_TOUR,
  async (addVirtualTourDatas, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/virtualtour/create`,
        addVirtualTourDatas
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const editVirtualTourBanner = createAsyncThunk(
  EDIT_VIRTUAL_TOUR_BANNER,
  async (editVirtualTour, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `api/virtualtour/update`,
        editVirtualTour
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const virtualTourBannerSlice = createSlice({
  name: "virtualTourBannerSlice",
  initialState: {
    getVirtualTourBannerListData: [],
    getVirtualTourData: [],
    addNewVirtualTourDatass: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getVirtualTourBanner.pending, (state) => {
      state.getVirtualTourBannerListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getVirtualTourBanner.fulfilled, (state, action) => {
      state.getVirtualTourBannerListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getVirtualTourBanner.rejected, (state, action) => {
      state.getVirtualTourBannerListData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //
    builder.addCase(virtualTourBannerDetail.pending, (state) => {
      state.getVirtualTourData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(virtualTourBannerDetail.fulfilled, (state, action) => {
      state.getVirtualTourData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(virtualTourBannerDetail.rejected, (state, action) => {
      state.getVirtualTourData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //
    builder.addCase(addNewVirtualTour.pending, (state) => {
      state.addNewVirtualTourDatass = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(addNewVirtualTour.fulfilled, (state, action) => {
      state.addNewVirtualTourDatass = action.payload?.data;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(addNewVirtualTour.rejected, (state, action) => {
      state.addNewVirtualTourDatass = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default virtualTourBannerSlice.reducer;
