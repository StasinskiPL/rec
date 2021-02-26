import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  error: false,
  users: [],
};

export const fetchUsers = createAsyncThunk("dashboard/fetch", async () => {
  try {
    const { data } = await axios.get(
      "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data"
    );
    return data;
  } catch (error) {
    console.log(error);
  }
});

const dashboardSlide = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [fetchUsers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.users = payload;
    },
    [fetchUsers.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export default dashboardSlide.reducer;
