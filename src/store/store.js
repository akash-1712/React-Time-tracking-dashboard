import { configureStore } from "@reduxjs/toolkit";
import Auth from "./auth-slice";
import backDrop from "./backdrop-slice";

const store = configureStore({
  reducer: {
    Auth: Auth,
    backdrop: backDrop,
  },
});

export default store;
