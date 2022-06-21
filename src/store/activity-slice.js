import { createSlice } from "@reduxjs/toolkit";
import { FetchActivityData } from "./activity-action";

const initialActivityState = {
  daily: true,
  weekly: false,
  data: [],
  activityPage: 1,
  totalActivity: 0,
  itemsPerPage: 0,
};

const activitySlice = createSlice({
  name: "activity",
  initialState: initialActivityState,
  reducers: {
    setDaily(state) {
      state.daily = true;
      state.weekly = false;
    },
    setWeekly(state) {
      state.daily = false;
      state.weekly = true;
    },
    setMonthly(state) {
      state.daily = false;
      state.weekly = false;
    },
    replaceActivity(state, action) {
      state.data = action.payload.activityData;
      state.totalActivity = action.payload.totalActivity;
      state.itemsPerPage = action.payload.itemsPerPage;

      // console.log(state.data);
    },
    previousPage(state, action) {
      state.activityPage = state.activityPage - 1;
    },
    nextPage(state) {
      state.activityPage = state.activityPage + 1;
    },
  },
});

export const activityActions = activitySlice.actions;
export default activitySlice.reducer;
