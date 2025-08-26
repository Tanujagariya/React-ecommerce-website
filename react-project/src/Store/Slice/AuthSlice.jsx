import { createSlice } from "@reduxjs/toolkit";

const savedAuthState = localStorage.getItem("authState");
const initialState = savedAuthState
  ? JSON.parse(savedAuthState)
  : {
      isLoggedIn: false,
      error: null,
      user: null,
      registered: false,
    };

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const { username, email, password } = action.payload;

      if (username && email && password) {
        state.user = { username, email };
        state.registered = true;
        state.error = null;
      } else {
        state.error = "All fields are required!";
      }

      localStorage.setItem("authState", JSON.stringify(state));
    },
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload || state.user;
      state.error = null;

      localStorage.setItem("authState", JSON.stringify(state));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.registered = false;

      localStorage.removeItem("authState");
    },
    clearError: (state) => {
      state.error = null;
      localStorage.setItem("authState", JSON.stringify(state));
    },
  },
});

export const { registerUser, login, logout, clearError } = AuthSlice.actions;
export default AuthSlice.reducer;
