import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/AxiosInstance";
import { FETCH_ACTION, LOGOUT } from "./type";

export const login = createAsyncThunk(FETCH_ACTION, async (data, thunkAPI) => {
  try {
    const response = await axiosInstance.post("api/admin/signin", data);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error });
  }
});

export const logout = createAsyncThunk(LOGOUT, async (data, thunkAPI) => {
  try {
    const response = await axiosInstance.post("api/admin/signout");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error });
  }
});

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    isFetching: false,
    data: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.data = {};
      state.isFetching = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoggedIn = true;
      state.isFetching = false;
      localStorage.setItem(
        "Sidebar_Module_Assigned",
        JSON.stringify(action.payload.user)
      );
      localStorage.setItem(
        "AUTH_ACCESS_TOKEN",
        JSON.stringify(action.payload.token)
      );
    });
    builder.addCase(login.rejected, (state, action) => {
      state.data = {};
      state.isLoggedIn = false;
      state.isFetching = false;
    });
  },
});

export default slice.reducer;
