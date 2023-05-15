import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import {
  FAQ_CATEGORY_LISTING,
  DELETE_FAQ_CATEGORY,
  ADD_FAQ_CATEGORY,
  FAQ_CATEGORY_DETAIL_PAGE,
  EDIT_FAQ_CATEGORY,
} from "./type";
import { PER_PAGE_LIMIT } from "constants/AppConstant";

export const getFaqCategoryData = createAsyncThunk(
  FAQ_CATEGORY_LISTING,
  async (usersListData, thunkAPI) => {
    const { page } = usersListData;
    try {
      const response = await axiosInstance.get(
        `api/faqcategory/getfaqcategory?page=${page}&limit=${PER_PAGE_LIMIT}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addNewFaqCategory = createAsyncThunk(
  ADD_FAQ_CATEGORY,
  async (addCatalogueDatas, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/faqcategory/create`,
        addCatalogueDatas
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteFaqCategory = createAsyncThunk(
  DELETE_FAQ_CATEGORY,
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.post("api/faqcategory/delete", {
        id,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getFaqCategoryById = createAsyncThunk(
  FAQ_CATEGORY_DETAIL_PAGE,
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `api/faqcategory/getfaqcategory/${productId}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const editFaqCategory = createAsyncThunk(
  EDIT_FAQ_CATEGORY,
  async (payload, thunkAPI) => {
    const updatedPayload = {
      name: payload?.data?.name,
      _id: payload?.id,
    };
    try {
      const response = await axiosInstance.patch(
        `api/faqcategory/update`,
        updatedPayload
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const faqCategorySlice = createSlice({
  name: "faqCategorySlice",
  initialState: {
    getFaqCategoryListData: [],
    addNewFaqCategoryDatass: [],
    getFaqCategoryData: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFaqCategoryData.pending, (state) => {
      state.getFaqCategoryListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getFaqCategoryData.fulfilled, (state, action) => {
      state.getFaqCategoryListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getFaqCategoryData.rejected, (state, action) => {
      state.getFaqCategoryListData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //
    builder.addCase(addNewFaqCategory.pending, (state) => {
      state.addNewFaqCategoryDatass = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(addNewFaqCategory.fulfilled, (state, action) => {
      state.addNewFaqCategoryDatass = action.payload?.data;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(addNewFaqCategory.rejected, (state, action) => {
      state.addNewFaqCategoryDatass = [];
      state.isFetching = false;
      state.isError = true;
    });
    // //
    builder.addCase(getFaqCategoryById.pending, (state) => {
      state.getFaqCategoryData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getFaqCategoryById.fulfilled, (state, action) => {
      state.getFaqCategoryData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getFaqCategoryById.rejected, (state, action) => {
      state.getFaqCategoryData = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default faqCategorySlice.reducer;
