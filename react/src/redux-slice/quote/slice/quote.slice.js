import { createSlice } from "@reduxjs/toolkit";
import { quoteThunk } from "../thunk";

const quoteSlice = createSlice({
  name: "quote",
  initialState: {
    loading: false,
    top16Quote: [],
    error: null,
    requiresAuth: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(quoteThunk.getTop16Quotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(quoteThunk.getTop16Quotes.fulfilled, (state, action) => {
        state.top16Quote = action.payload;
        state.loading = false;
      })
      .addCase(quoteThunk.getTop16Quotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default quoteSlice.reducer;
