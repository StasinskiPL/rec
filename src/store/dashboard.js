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
  lastSortType: null,
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

export const deleteUser = createAsyncThunk(
  "dashboard/delete",
  async ({ id }) => {
    try {
      await userApi.delete("/posts/1", {
        id,
      });
      return id;
    } catch (error) {
      console.log(error);
    }
  }
);

const dashboardSlide = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    selectUser: (state, { payload }) => {
      state.selectedUser = payload;
    },
    resetSelectUser: (state) => {
      state.selectedUser = null;
    },
    resetAddUserState: (state) => {
      state.addUserState = "idle";
    },
    resetEditUserState: (state) => {
      state.editUserState = "idle";
    },
    sortUsers: (state, { payload }) => {
      const searchType = payload.type.toLowerCase();
      if (searchType === state.lastSortType) {
        state.users = state.users.reverse();
      } else if (searchType === "city") {
        state.users.sort((a, b) => {
          if (a.address?.city < b.address?.city) {
            return -1;
          }
          if (a.address?.city > b.address?.city) {
            return 1;
          }
          return 0;
        });
      } else {
        state.users = state.users.sort((a, b) => {
          if (a[searchType] < b[searchType]) {
            return -1;
          }
          if (a[searchType] > b[searchType]) {
            return 1;
          }
          return 0;
        });
      }
      state.lastSortType = searchType;
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
      const user = payload;
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
    ///////
    [deleteUser.fulfilled]: (state, { payload }) => {
      state.selectedUser = null;
      state.users = state.users.filter((user) => user.id !== payload);
    },
  },
});

export const {
  resetAddUserState,
  selectUser,
  resetEditUserState,
  resetSelectUser,
  sortUsers,
} = dashboardSlide.actions;

export default dashboardSlide.reducer;
