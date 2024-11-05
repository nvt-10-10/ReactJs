import { createSlice } from "@reduxjs/toolkit";
import { authThunk } from "../thunk";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    error: null,
    loading: false,
    user: null,
    requiresAuth: true,
  },
  reducers: {
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLogin = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(authThunk.loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(authThunk.loginUser.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.loading = false;
    })
    .addCase(authThunk.loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(authThunk.logoutUser.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.user = null;
    });
  },
});

export const { setIsLogin, setUser, logout } = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLogin;
export default authSlice.reducer;
