import { createSlice } from "@reduxjs/toolkit";
import { addUser, deleteUser, fetchUsers, updateUser } from "./userThunk";

export const userSlice = createSlice({
    name: "users",
    initialState: {
        users: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
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
                const index = state.users.findIndex((u) => u.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            })
            // DELETE 
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter((u) => u.id !== action.payload);
            });
    }
})

export default userSlice.reducer