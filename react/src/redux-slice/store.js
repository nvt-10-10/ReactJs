import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authMiddleware, loggerMiddleware } from "../middleware";
const store = configureStore({
  reducer: rootReducer,
  authMiddleware,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware, loggerMiddleware),
});
export default store;
