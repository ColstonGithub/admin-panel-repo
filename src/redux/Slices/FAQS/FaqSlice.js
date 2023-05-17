import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import {
  FAQ_LISTING,
  DELETE_FAQ,
  FAQ_DETAIL_PAGE,
  ADD_FAQ,
  EDIT_FAQ,
} from "./type";
import { PER_PAGE_LIMIT } from "constants/AppConstant";

export const getFaqData = createAsyncThunk(
  FAQ_LISTING,
  async (usersListData, thunkAPI) => {
    const { page } = usersListData;
    try {
      const response = await axiosInstance.post(
        `api/faq/getfaqs?page=${page}&limit=${PER_PAGE_LIMIT}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addNewFaq = createAsyncThunk(
  ADD_FAQ,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/faq/create`, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteFaq = createAsyncThunk(DELETE_FAQ, async (id, thunkAPI) => {
  try {
    const response = await axiosInstance.post("api/faq/delete", {
      id,
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error });
  }
});

export const getFaqById = createAsyncThunk(
  FAQ_DETAIL_PAGE,
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`api/faq/${productId}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const editFaq = createAsyncThunk(EDIT_FAQ, async (payload, thunkAPI) => {
  try {
    const response = await axiosInstance.patch(`api/faq/update`, payload);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error });
  }
});

const faqSlice = createSlice({
  name: "faqSlice",
  initialState: {
    getFaqListData: [],
    addNewFaqCategoryDatass: [],
    getFaqData: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFaqData.pending, (state) => {
      state.getFaqListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getFaqData.fulfilled, (state, action) => {
      state.getFaqListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getFaqData.rejected, (state, action) => {
      state.getFaqListData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //
    builder.addCase(addNewFaq.pending, (state) => {
      state.addNewFaqCategoryDatass = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(addNewFaq.fulfilled, (state, action) => {
      state.addNewFaqCategoryDatass = action.payload?.data;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(addNewFaq.rejected, (state, action) => {
      state.addNewFaqCategoryDatass = [];
      state.isFetching = false;
      state.isError = true;
    });
    // //
    builder.addCase(getFaqById.pending, (state) => {
      state.getFaqData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getFaqById.fulfilled, (state, action) => {
      state.getFaqData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getFaqById.rejected, (state, action) => {
      state.getFaqData = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default faqSlice.reducer;
