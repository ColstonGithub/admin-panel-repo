import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import {
  BLOGS_CATEGORY_DATA,
  ADD_BLOG_CATEGORY,
  BLOGS_CATEGORY_DETAILS,
  EDIT_BLOGS_CATEGORY,
  DELETE_BLOG_CATEGORY,
} from "./type";
import { PER_PAGE_LIMIT } from "constants/AppConstant";

export const getBlogCategory = createAsyncThunk(
  BLOGS_CATEGORY_DATA,
  async (usersListData, thunkAPI) => {
    const { page } = usersListData;
    try {
      const response = await axiosInstance.get(
        `api/blogcategory/getblogcategory?page=${page}&limit=${PER_PAGE_LIMIT}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getBlogCategoryDetails = createAsyncThunk(
  BLOGS_CATEGORY_DETAILS,
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `api/blogcategory/getblogcategory/${id}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const editBlogCategory = createAsyncThunk(
  EDIT_BLOGS_CATEGORY,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `api/blogcategory/update`,
        payload
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addBlogCategory = createAsyncThunk(
  ADD_BLOG_CATEGORY,
  async (addBlogCategoryData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/blogcategory/create`,
        addBlogCategoryData
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);
export const deleteBlogCategory = createAsyncThunk(
  DELETE_BLOG_CATEGORY,
  async (cId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/blogcategory/delete`, {
        id: cId,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);
const blogsCategorySlice = createSlice({
  name: "blogsCategorySlice",
  initialState: {
    getBlogCategoryListData: [],
    addBlogCategoryDatas: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBlogCategory.pending, (state) => {
      state.getBlogCategoryListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getBlogCategory.fulfilled, (state, action) => {
      state.getBlogCategoryListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getBlogCategory.rejected, (state, action) => {
      state.getBlogCategoryListData = [];
      state.isFetching = false;
      state.isError = true;
    });

    builder.addCase(addBlogCategory.pending, (state) => {
      state.addBlogCategoryDatas = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(addBlogCategory.fulfilled, (state, action) => {
      state.addBlogCategoryDatas = action.payload?.data;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(addBlogCategory.rejected, (state, action) => {
      state.addBlogCategoryDatas = [];
      state.isFetching = false;
      state.isError = true;
    });
    builder.addCase(getBlogCategoryDetails.pending, (state) => {
      state.getBlogCategoryDetails = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getBlogCategoryDetails.fulfilled, (state, action) => {
      state.getBlogCategoryDetails = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getBlogCategoryDetails.rejected, (state, action) => {
      state.getBlogCategoryDetails = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});
export default blogsCategorySlice.reducer;
