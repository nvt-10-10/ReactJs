import { createSlice } from "@reduxjs/toolkit";
import {   productThunk } from "../thunk";

const productSlice = createSlice({
  name: "product",
  initialState: {
    loading: false,
    top6Products: [],
    error: null, 
    requiresAuth: false,
   
  },

  extraReducers: (builder) => {
    builder
    .addCase(productThunk.getTop6Products.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(productThunk.getTop6Products.fulfilled, (state, action) => {
      state.top6Products = action.payload;
      state.loading = false;
    })
    .addCase(productThunk.getTop6Products.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
  },
});

export default productSlice.reducer;
