import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../services/api";

// REGISTER
export const register = createAsyncThunk(
  "users/register",
  async (formData, thunkAPI) => {
    try {
      const res = await API.post("/auth/register", formData);
      return res.data;
    } catch (err) {
      console.log(err.response.data);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

// LOGIN
export const login = createAsyncThunk(
  "users/login",
  async (formData, thunkAPI) => {
    try {
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.data.role);

      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

// FETCH USERS
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/users");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message,
      );
    }
  },
);

// ADD
export const addUser = createAsyncThunk(
  "users/addUser",
  async (formData, thunkAPI) => {
    try {
      const res = await API.post("/users", formData);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message,
      );
    }
  },
);

// UPDATE
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ editId, formData }, thunkAPI) => {
    try {
      const res = await API.put(`/users/${editId}`, formData);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message,
      );
    }
  },
);

// DELETE
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, thunkAPI) => {
    try {
      await API.delete(`/users/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message,
      );
    }
  },
);
