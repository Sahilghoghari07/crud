import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/users";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const addUser = createAsyncThunk(
  "users/addUser",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}`, formData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ editId, formData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/${editId}`, formData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);
