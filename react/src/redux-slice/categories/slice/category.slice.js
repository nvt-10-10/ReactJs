import { createSlice } from "@reduxjs/toolkit";
import {  categoryThunk } from "../thunk";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    loading: false,
    categories: [],
    error: null, 
    requiresAuth: false,
   
  },

  extraReducers: (builder) => {
    builder
    .addCase(categoryThunk.getAllCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(categoryThunk.getAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    })
    .addCase(categoryThunk.getAllCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
  },
});

export default categorySlice.reducer;
