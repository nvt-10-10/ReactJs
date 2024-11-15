// src/redux/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, logout } from "../../../api";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await login({ email, password });
      if (response) {
        return { email, message: "Login successful" };
      } else {
        return rejectWithValue("Login failed. Please try again.");
      }
    } catch (error) {
      // src/redux/authThunks.js
      console.log({ error: error.response.data.message });

      return rejectWithValue("Login failed. Please try again.");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async ({ rejectWithValue }) => {
    try {
      const response = await logout();
      if (response.success) {
        return rejectWithValue("Logout successful");
      } else {
        return rejectWithValue("Logout failed. Please try again.");
      }
    } catch (error) {
      return rejectWithValue("Logout failed. Please try again.");
    }
  }
);
