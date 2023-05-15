import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import {
  BLOGS_DATA,
  DELETE_BLOG,
  BLOGS_DETAIL_PAGE,
  ADD_BLOGS,
  EDIT_BLOGS,
} from "./type";
import { PER_PAGE_LIMIT } from "constants/AppConstant";

export const getBlogs = createAsyncThunk(
  BLOGS_DATA,
  async (usersListData, thunkAPI) => {
    const { page } = usersListData;
    try {
      const response = await axiosInstance.get(
        `api/blogs/getblogs?page=${page}&limit=${PER_PAGE_LIMIT}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addBlogs = createAsyncThunk(
  ADD_BLOGS,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/blogs/create`, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const editBlogs = createAsyncThunk(
  EDIT_BLOGS,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`api/blogs/update`, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteBlog = createAsyncThunk(
  DELETE_BLOG,
  async (cId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/blogs/delete`, {
        id: cId,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getBlogsDetail = createAsyncThunk(
  BLOGS_DETAIL_PAGE,
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`api/blogs/${productId}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const blogsSlice = createSlice({
  name: "blogsSlice",
  initialState: {
    getBlogsListData: [],
    getBlogsData: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBlogs.pending, (state) => {
      state.getBlogsListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getBlogs.fulfilled, (state, action) => {
      state.getBlogsListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getBlogs.rejected, (state, action) => {
      state.getBlogsListData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //
    builder.addCase(getBlogsDetail.pending, (state) => {
      state.getBlogsData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getBlogsDetail.fulfilled, (state, action) => {
      state.getBlogsData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getBlogsDetail.rejected, (state, action) => {
      state.getBlogsData = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default blogsSlice.reducer;
