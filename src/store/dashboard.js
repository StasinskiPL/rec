import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import userApi from "../api/userApi";

const initialState = {
  loading: false,
  error: false,
  addUserState: "idle",
  editUserState: "idle",
  users: [],
  selectedUser: null,
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

export const addUser = createAsyncThunk("dashboard/add", async ({ user }) => {
  try {
    const { data } = await userApi.post("/posts", {
      ...user,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
});
export const editUser = createAsyncThunk("dashboard/edit", async ({ user }) => {
  try {
    const { data } = await userApi.patch("/posts/1", {
      user,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
});

const dashboardSlide = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    selectUser: (state, { payload }) => {
      state.selectedUser = payload;
    },
    resetAddUserState: (state) => {
      state.addUserState = "idle";
    },
    resetEditUserState: (state) => {
      state.editUserState = "idle";
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
    //////////
    [addUser.pending]: (state) => {
      state.addUserState = "pending";
    },
    [addUser.fulfilled]: (state, { payload }) => {
      const user = payload.user;
      user.id = new Date().getTime();
      state.users.push(user);
      state.addUserState = "fulfilled";
    },
    [addUser.rejected]: (state) => {
      state.addUserState = "fulfilled";
    },
    // /////
    [editUser.pending]: (state) => {
      state.editUserState = "pending";
    },
    [editUser.fulfilled]: (state, { payload }) => {
      state.users = state.users.map((user) => {
        if (user.id === payload.user.id) {
          return { ...payload.user, id: state.selectedUser };
        }
        return user;
      });

      state.editUserState = "fulfilled";
    },
    [editUser.rejected]: (state) => {
      state.editUserState = "fulfilled";
    },
  },
});

export const {
  resetAddUserState,
  selectUser,
  resetEditUserState,
} = dashboardSlide.actions;

export default dashboardSlide.reducer;
