import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import Auth from "./auth-slice";
import backDrop from "./backdrop-slice";
import activity from "./activity-slice";

const store = configureStore({
  reducer: {
    Auth: Auth,
    backdrop: backDrop,
    activity: activity,
  },
});

export default store;
