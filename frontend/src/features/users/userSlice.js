import { createSlice } from "@reduxjs/toolkit";
import {
  addUser,
  deleteUser,
  fetchUsers,
  register,
  updateUser,
} from "./userThunk";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    userRole: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //REGISTER
      .addCase(register.fulfilled, (state, action) => {
        state.userRole = action.payload;
      })
      // FETCH
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      // ADD
      .addCase(addUser.fulfilled, (state, action) => {
        const exists = state.users.some((u) => u._id === action.payload._id);

        if (!exists) {
          state.users.push(action.payload);
        }
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

export default userSlice.reducer;
