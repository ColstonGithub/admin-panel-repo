import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import { PER_PAGE_LIMIT } from "constants/AppConstant";
import { EXPLORE_CATEGORY_CHILDREN } from "./type";

export const getExploreCategoryChildren = createAsyncThunk(
  EXPLORE_CATEGORY_CHILDREN,
  async (categoryId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `api/category/${categoryId}/children`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const ExploreCategoryChildrenSlice = createSlice({
  name: "ExploreCategoryChildrenSlice",
  initialState: {
    getExploreCategoryChildrenData: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getExploreCategoryChildren.pending, (state) => {
      state.getExploreCategoryChildrenData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getExploreCategoryChildren.fulfilled, (state, action) => {
      state.getExploreCategoryChildrenData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getExploreCategoryChildren.rejected, (state, action) => {
      state.getExploreCategoryChildrenData = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default ExploreCategoryChildrenSlice.reducer;
