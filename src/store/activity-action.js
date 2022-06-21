import { activityActions } from "./activity-slice";
import { useSelector } from "react-redux";

export const FetchActivityData = (page = 1) => {
  return async (dispatch) => {
    const fetchData = async () => {
      console.log(page);
      const response = await fetch(
        "http://localhost:8080/activity/get?page=" + page,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        console.log(response);
        return;
      }
      const data = await response.json();
      return data;
    };
    try {
      const activityData = await fetchData();
      console.log(activityData);
      dispatch(
        activityActions.replaceActivity({
          activityData: activityData.data,
          totalActivity: activityData.totalActivity,
          itemsPerPage: activityData.itemsPerPage,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
};
