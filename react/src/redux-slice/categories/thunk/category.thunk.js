// src/redux/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCategory } from "../../../api";
const getAllCategories = createAsyncThunk(
  "category/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllCategory();
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const categoryThunk = {
  getAllCategories,
};
