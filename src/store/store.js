import { configureStore } from "@reduxjs/toolkit";
import dashboardReducer from "./dashboard";

export default configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
});
