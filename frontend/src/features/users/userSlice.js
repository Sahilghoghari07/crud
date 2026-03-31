import { createSlice } from "@reduxjs/toolkit";
import {
  addUser,
  deleteUser,
  fetchUsers,
  login,
  updateUser,
} from "./userThunk";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    user: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //LOGIN
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // FETCH
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })

      // ADD
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })

      // UPDATE
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (u) => u._id === action.payload._id,
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u._id !== action.payload);
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
