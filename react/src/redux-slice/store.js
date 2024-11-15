import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authMiddleware, loggerMiddleware } from "../middleware";
import toastMiddleware from "../middleware/toast.middleware";
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authMiddleware,
      loggerMiddleware,
      toastMiddleware
    ),
});
export default store;
