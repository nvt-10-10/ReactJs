// src/redux/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTop6Product } from "../../../api/products";

const getTop6Products = createAsyncThunk("/products/top-6", async (_, { rejectWithValue }) => {
  try {
    const response = await getTop6Product();
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const productThunk = {
  getTop6Products,
};
