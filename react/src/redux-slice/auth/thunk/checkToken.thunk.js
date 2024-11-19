import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkToken } from "../../../api";

export const checkTokens = createAsyncThunk(
  "auth/checkToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await checkToken();
      if (response) {
        return true;
      } else {
        return rejectWithValue("Token không hợp lệ hoặc đã hết hạn.");
      }
    } catch (error) {
      return rejectWithValue("Token không hợp lệ hoặc đã hết hạn.");
    }
  }
);
