import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

export const register = createAsyncThunk("register", async (data) => {
  const res = await API.post("/auth/register", data);
  return res.data;
});

export const login = createAsyncThunk("login", async (data) => {
  const res = await API.post("/auth/login", data);

  localStorage.setItem("token", res.data.token);

  return res.data.data;
});

export const fetchUsers = createAsyncThunk("fetchUsers", async () => {
  const res = await API.get("/users");
  return res.data.data;
});

export const addUser = createAsyncThunk("addUser", async (data) => {
  const res = await API.post("/users", data);
  return res.data.data;
});

export const updateUser = createAsyncThunk(
  "updateUser",
  async ({ editId, formData }) => {
    const res = await API.put(`/users/${editId}`, formData);
    return res.data.data;
  },
);

export const deleteUser = createAsyncThunk("deleteUser", async (id) => {
  await API.delete(`/users/${id}`);
  return id;
});
