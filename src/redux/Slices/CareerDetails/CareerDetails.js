import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import {
  CAREER_DETAILS_DATA,
  ADD_CAREER_DETAILS,
  EDIT_CAREER_DETAILS,
  DELETE_CAREER_DETAILS,
  CAREER_DETAILS_DETAIL_PAGE,
} from "./type";
import { PER_PAGE_LIMIT } from "constants/AppConstant";

export const getCareerDetailData = createAsyncThunk(
  CAREER_DETAILS_DATA,
  async (usersListData, thunkAPI) => {
    const { page } = usersListData;
    try {
      const response = await axiosInstance.get(
        `api/careerDetails/getCareerDetails?page=${page}&limit=${PER_PAGE_LIMIT}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

// export const addBlogs = createAsyncThunk(
//   ADD_BLOGS,
//   async (payload, thunkAPI) => {
//     try {
//       const response = await axiosInstance.post(`api/blogs/create`, payload);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue({ error: error });
//     }
//   }
// );

// export const editBlogs = createAsyncThunk(
//   EDIT_BLOGS,
//   async (payload, thunkAPI) => {
//     try {
//       const response = await axiosInstance.patch(`api/blogs/update`, payload);
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue({ error: error });
//     }
//   }
// );

// export const deleteBlog = createAsyncThunk(
//   DELETE_BLOG,
//   async (cId, thunkAPI) => {
//     try {
//       const response = await axiosInstance.post(`api/blogs/delete`, {
//         id: cId,
//       });

//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue({ error: error });
//     }
//   }
// );

// export const getBlogsDetail = createAsyncThunk(
//   BLOGS_DETAIL_PAGE,
//   async (productId, thunkAPI) => {
//     try {
//       const response = await axiosInstance.get(`api/blogs/${productId}`);

//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue({ error: error });
//     }
//   }
// );

const careerDetailsSlice = createSlice({
  name: "careerDetailsSlice",
  initialState: {
    getCareerDetailsListData: [],
    getCareerDetailsData: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCareerDetailData.pending, (state) => {
      state.getCareerDetailsListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getCareerDetailData.fulfilled, (state, action) => {
      state.getCareerDetailsListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getCareerDetailData.rejected, (state, action) => {
      state.getCareerDetailsListData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //
    // builder.addCase(getBlogsDetail.pending, (state) => {
    //   state.getBlogsData = [];
    //   state.isFetching = true;
    //   state.isError = false;
    // });

    // builder.addCase(getBlogsDetail.fulfilled, (state, action) => {
    //   state.getBlogsData = action.payload;
    //   state.isFetching = false;
    //   state.isError = false;
    // });
    // builder.addCase(getBlogsDetail.rejected, (state, action) => {
    //   state.getBlogsData = [];
    //   state.isFetching = false;
    //   state.isError = true;
    // });
  },
});

export default careerDetailsSlice.reducer;
