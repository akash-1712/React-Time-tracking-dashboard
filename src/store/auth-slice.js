import { createSlice } from "@reduxjs/toolkit";
import profilePic from "../images/icons8-user-16.png";

const initialToken = localStorage.getItem("token") || null;
const authInitialState = {
  token: initialToken,
  isLoggedIn: !!initialToken,
  authLoading: false,
  logoutTime: !!initialToken,
  imageUrl: profilePic,
};

const Auth = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = !!action.payload.token;
      state.logoutTime = action.payload.timer;
      localStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      if (state.logoutTime) {
        clearTimeout(state.logoutTime);
      }
      state.logoutTime = null;
    },
    loading(state, action) {
      state.authLoading = action.payload;
    },
    appendImage(state, action) {
      state.imageUrl = action.payload;
      console.log(action.payload, "ok");
    },
  },
});

export const AuthActions = Auth.actions;
export default Auth.reducer;
