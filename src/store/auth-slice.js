import { createSlice } from "@reduxjs/toolkit";

const authInitialState = { token: null, isLoggedIn: false };
const Auth = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.isLoggedIn = !!action.payload;
    },
    logout(state) {
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const AuthActions = Auth.actions;
export default Auth.reducer;
