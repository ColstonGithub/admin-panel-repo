import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import {
  CATALOGUE_DATA,
  DELETE_CATALOGUE,
  CATALOGUE_DETAIL_PAGE,
  ADD_NEW_CATALOGUE,
  EDIT_NEW_CATALOGUE,
} from "./type";
import { PER_PAGE_LIMIT } from "constants/AppConstant";

export const getCatalogues = createAsyncThunk(
  CATALOGUE_DATA,
  async (usersListData, thunkAPI) => {
    const { page } = usersListData;
    try {
      const response = await axiosInstance.get(
        `api/catalogue/getcatalogue?page=${page}&limit=${PER_PAGE_LIMIT}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const deleteCatalogue = createAsyncThunk(
  DELETE_CATALOGUE,
  async (cId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/catalogue/delete`, {
        id: cId,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getCatalogueDetail = createAsyncThunk(
  CATALOGUE_DETAIL_PAGE,
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`api/catalogue/${productId}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addNewCatalogue = createAsyncThunk(
  ADD_NEW_CATALOGUE,
  async (addCatalogueDatas, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/catalogue/create`,
        addCatalogueDatas
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const editCatalogue = createAsyncThunk(
  EDIT_NEW_CATALOGUE,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `api/catalogue/update`,
        payload
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const cataloguesSlice = createSlice({
  name: "cataloguesSlice",
  initialState: {
    getCataloguesListData: [],
    getCatalogueData: [],
    addNewCatalogueDatass: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCatalogues.pending, (state) => {
      state.getCataloguesListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getCatalogues.fulfilled, (state, action) => {
      state.getCataloguesListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getCatalogues.rejected, (state, action) => {
      state.getCataloguesListData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //
    builder.addCase(getCatalogueDetail.pending, (state) => {
      state.getCatalogueData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getCatalogueDetail.fulfilled, (state, action) => {
      state.getCatalogueData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getCatalogueDetail.rejected, (state, action) => {
      state.getCatalogueData = [];
      state.isFetching = false;
      state.isError = true;
    });
    //
    builder.addCase(addNewCatalogue.pending, (state) => {
      state.addNewCatalogueDatass = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(addNewCatalogue.fulfilled, (state, action) => {
      state.addNewCatalogueDatass = action.payload?.data;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(addNewCatalogue.rejected, (state, action) => {
      state.addNewCatalogueDatass = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default cataloguesSlice.reducer;
