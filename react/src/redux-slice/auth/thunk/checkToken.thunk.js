// src/redux/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAuth } from "../../../api/auth/post";

export const loginUser = createAsyncThunk(
  "auth/checkToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await createAuth.checkToken();
      if (response) {
        return true;
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
