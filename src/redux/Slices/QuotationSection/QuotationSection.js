import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import {
  QUOTATION_SECTION_DATA,
  DELETE_QUOTATION_SECTION,
  QUOTATION_SEC_DETAIL_PAGE,
} from "./type";
import { PER_PAGE_LIMIT } from "constants/AppConstant";

export const getQuotationSection = createAsyncThunk(
  QUOTATION_SECTION_DATA,
  async (usersListData, thunkAPI) => {
    const { page } = usersListData;
    try {
      const response = await axiosInstance.get(
        `api/requestforquotation/getrequestforquotation?page=${page}&limit=${PER_PAGE_LIMIT}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteQuotationSection = createAsyncThunk(
  DELETE_QUOTATION_SECTION,
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "api/requestforquotation/delete",
        {
          id,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getQuotationSecById = createAsyncThunk(
  QUOTATION_SEC_DETAIL_PAGE,
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `api/requestforquotation/getrequestforquotation/${productId}`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const quotationSectionSlice = createSlice({
  name: "quotationSectionSlice",
  initialState: {
    getQuotationSectionListData: [],
    getQuotationSecData: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuotationSection.pending, (state) => {
      state.getQuotationSectionListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getQuotationSection.fulfilled, (state, action) => {
      state.getQuotationSectionListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getQuotationSection.rejected, (state, action) => {
      state.getQuotationSectionListData = [];
      state.isFetching = false;
      state.isError = true;
    });
    // //
    builder.addCase(getQuotationSecById.pending, (state) => {
      state.getQuotationSecData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getQuotationSecById.fulfilled, (state, action) => {
      state.getQuotationSecData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getQuotationSecById.rejected, (state, action) => {
      state.getQuotationSecData = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default quotationSectionSlice.reducer;
