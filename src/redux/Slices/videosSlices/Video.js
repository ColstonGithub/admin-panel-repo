import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import {
  VIDEO_DATA,
  DELETE_VIDEO,
  VIDEO_DETAIL_PAGE,
  ADD_VIDEO,
  EDIT_VIDEO_DETAILS,
} from "./type";
import { PER_PAGE_LIMIT } from "constants/AppConstant";

export const getVideos = createAsyncThunk(
  VIDEO_DATA,
  async (usersListData, thunkAPI) => {
    const { page } = usersListData;
    try {
      const response = await axiosInstance.post(
        `api/video/getvideos?page=${page}&limit=${PER_PAGE_LIMIT}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteVideo = createAsyncThunk(
  DELETE_VIDEO,
  async (cId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/video/delete`, {
        id: cId,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getVideoDetail = createAsyncThunk(
  VIDEO_DETAIL_PAGE,
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`api/video/${productId}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addVideoData = createAsyncThunk(
  ADD_VIDEO,
  async (addVideoDatas, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/video/create`,
        addVideoDatas
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const editVideoDetails = createAsyncThunk(
  EDIT_VIDEO_DETAILS,
  async (editVideo, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`api/video/update`, editVideo);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const videoSlice = createSlice({
  name: "videoSlice",
  initialState: {
    getVideosListData: [],
    getVideoData: [],
    addVideoData: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getVideos.pending, (state) => {
      state.getVideosListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getVideos.fulfilled, (state, action) => {
      state.getVideosListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getVideos.rejected, (state, action) => {
      state.getVideosListData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //
    builder.addCase(getVideoDetail.pending, (state) => {
      state.getVideoData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getVideoDetail.fulfilled, (state, action) => {
      state.getVideoData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getVideoDetail.rejected, (state, action) => {
      state.getVideoData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //

    builder.addCase(addVideoData.pending, (state) => {
      state.addVideoDatass = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(addVideoData.fulfilled, (state, action) => {
      state.addVideoDatass = action.payload?.data;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(addVideoData.rejected, (state, action) => {
      state.addVideoDatass = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default videoSlice.reducer;
