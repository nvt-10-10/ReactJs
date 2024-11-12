// src/redux/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTop16Quote } from "../../../api/quotes";

const getTop16Quotes = createAsyncThunk(
  "/quote/top-16",
  async ({ page }, { rejectWithValue }) => {
    try {
      const response = await getTop16Quote(page);
      if (response.success) {
        return response.data;
      }
      return null;
    } catch (error) {
      return rejectWithValue(error.response.message);
    }
  }
);

export const quoteThunk = {
  getTop16Quotes,
};
