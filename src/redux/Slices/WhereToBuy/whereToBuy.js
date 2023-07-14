import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import {
  WHERE_TO_BUY_DATA,
  ADD_WHERE_TO_BUY,
  EDIT_WHERE_TO_BUY,
  DELETE_WHERE_TO_BUY,
  WHERE_TO_BUY_DETAIL_PAGE,
} from "./type";
import { PER_PAGE_LIMIT } from "constants/AppConstant";

export const getWhereToBuyData = createAsyncThunk(
  WHERE_TO_BUY_DATA,
  async (usersListData, thunkAPI) => {
    const { page } = usersListData;
    try {
      const response = await axiosInstance.get(
        `api/whereToBuy/getWhereToBuyCenters?page=${page}&limit=${PER_PAGE_LIMIT}`
      );
      console.log("orientation ", response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteWhereToBuy = createAsyncThunk(
  DELETE_WHERE_TO_BUY,
  async (cId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/whereToBuy/delete`,
        {
          id: cId,
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const whereToBuyDetail = createAsyncThunk(
  WHERE_TO_BUY_DETAIL_PAGE,
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`api/whereToBuy/${id}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addWhereToBuy = createAsyncThunk(
  ADD_WHERE_TO_BUY,
  async (formData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/whereToBuy/create`,
        formData
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const editWhereToBuy = createAsyncThunk(
  EDIT_WHERE_TO_BUY,
  async (payload, thunkAPI) => {
    try {
      console.log("payload ", payload);
      const response = await axiosInstance.patch(
        `api/whereToBuy/update`,
        payload
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const whereToBuySlice = createSlice({
  name: "whereToBuySlice",
  initialState: {
    getWhereToBuyListData: [],
    getWhereToBuyData: [],
    addWhereToBuyData: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWhereToBuyData.pending, (state) => {
      state.getWhereToBuyListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getWhereToBuyData.fulfilled, (state, action) => {
      state.getWhereToBuyListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getWhereToBuyData.rejected, (state, action) => {
      state.getWhereToBuyListData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //
    builder.addCase(whereToBuyDetail.pending, (state) => {
      state.getWhereToBuyData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(whereToBuyDetail.fulfilled, (state, action) => {
      state.getWhereToBuyData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(whereToBuyDetail.rejected, (state, action) => {
      state.getWhereToBuyData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //
    builder.addCase(addWhereToBuy.pending, (state) => {
      state.addWhereToBuyData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(addWhereToBuy.fulfilled, (state, action) => {
      state.addWhereToBuyData = action.payload?.data;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(addWhereToBuy.rejected, (state, action) => {
      state.addWhereToBuyData = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default whereToBuySlice.reducer;
