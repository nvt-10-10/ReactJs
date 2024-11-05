import { createSlice } from "@reduxjs/toolkit";
import { userThunk } from "../thunk";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    top4Supplier: [],
    top12Supplier: [],
    error: null,
    requiresAuth: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(userThunk.getTop4Suppliers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userThunk.getTop4Suppliers.fulfilled, (state, action) => {
        state.top4Supplier = action.payload;
        state.loading = false;
      })
      .addCase(userThunk.getTop4Suppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(userThunk.getTop12Suppliers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userThunk.getTop12Suppliers.fulfilled, (state, action) => {
        state.top12Supplier = action.payload;
        state.loading = false;
      })
      .addCase(userThunk.getTop12Suppliers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
