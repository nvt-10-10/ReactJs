// src/redux/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { create, getTop16Quote } from "../../../api/quotes";

const getTop16Quotes = createAsyncThunk(
  "quote/top-16",
  async ({ page, category }, { rejectWithValue }) => {
    try {
      const response = await getTop16Quote(page, category);
      if (response.success) {
        return response.data;
      }
      return null;
    } catch (error) {
      return rejectWithValue(error.response.message);
    }
  }
);

const createQuote = createAsyncThunk(
  "quote/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await create(data);
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
  createQuote,
};
