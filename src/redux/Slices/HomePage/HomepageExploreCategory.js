import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import { GET_EXPLORE_CATEGORY, DELETE_HOMEPAGE_EXPLORE_CATEGORY } from "./type";
import { PER_PAGE_LIMIT } from "constants/AppConstant";

export const getHomePageExploreCat = createAsyncThunk(
  GET_EXPLORE_CATEGORY,
  async (usersListData, thunkAPI) => {
    const { page } = usersListData;
    try {
      const response = await axiosInstance.post(
        `api/explorecategory/getexplorecategory?page=${page}&limit=${PER_PAGE_LIMIT}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteHomepageExploreCategory = createAsyncThunk(
  DELETE_HOMEPAGE_EXPLORE_CATEGORY,
  async (cId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/explorecategory/delete`, {
        id: cId,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const homepageExploreCategorySlice = createSlice({
  name: "homepageExploreCategorySlice",
  initialState: {
    getExploreCategoryListData: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHomePageExploreCat.pending, (state) => {
      state.getExploreCategoryListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getHomePageExploreCat.fulfilled, (state, action) => {
      state.getExploreCategoryListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getHomePageExploreCat.rejected, (state, action) => {
      state.getExploreCategoryListData = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default homepageExploreCategorySlice.reducer;
