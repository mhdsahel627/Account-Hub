import { createSlice } from "@reduxjs/toolkit";

const savedAuth = localStorage.getItem("auth");

const initialState = savedAuth
  ? JSON.parse(savedAuth)
  : {
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    };

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
      state.isAuthenticated = true;

      localStorage.setItem("auth", JSON.stringify(state));
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;

      localStorage.removeItem("auth");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;