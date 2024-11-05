// src/redux/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAuth } from "../../../api/auth/post";

 const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await createAuth.login({ email, password });
    if (response) {
      return { email, message: "Login successful" };
    } else {
      return rejectWithValue("Login failed. Please try again.");
    }
  } catch (error) {
    return rejectWithValue("Login failed. Please try again.");
  }
});

 const logoutUser = createAsyncThunk("auth/logoutUser", async ({ rejectWithValue }) => {
  try {
    const response = await createAuth.logout();
    if (response.success) {
      return rejectWithValue("Logout successful");
    } else {
      return rejectWithValue("Logout failed. Please try again.");
    }
  } catch (error) {
    return rejectWithValue("Logout failed. Please try again.");
  }
});

export const authThunk = {
  loginUser,
  logoutUser
}