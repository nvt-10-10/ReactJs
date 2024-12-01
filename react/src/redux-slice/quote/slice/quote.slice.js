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
      })

      .addCase(quoteThunk.createQuote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(quoteThunk.createQuote.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally, handle the created quote here, e.g., add it to the state
      })
      .addCase(quoteThunk.createQuote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Ensure the error is passed correctly
      });
  },
});

export default quoteSlice.reducer;
