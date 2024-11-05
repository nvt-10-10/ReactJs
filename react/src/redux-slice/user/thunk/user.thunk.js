// src/redux/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTop4Supplier, getTop12Supplier } from "../../../api";
const getTop4Suppliers = createAsyncThunk("/user/top-4", async (_, { rejectWithValue }) => {
  try {
    const response = await getTop4Supplier();
    if (response.success) {
      return response.data;
    }
    return null;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const getTop12Suppliers = createAsyncThunk("/user/top-12", async ({ page, search, category, country }, { rejectWithValue }) => {
  try {
    console.log({ page, search, category, country });
    const response = await getTop12Supplier(page, search, category, country);
    if (response.success) {
      return response.data;
    }
    return null;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const userThunk = {
  getTop4Suppliers,
  getTop12Suppliers,
};
