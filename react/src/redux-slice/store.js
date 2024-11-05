import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { authMiddleware } from '../middleware';
const store = configureStore({
  reducer: rootReducer,
  authMiddleware
});

export default store;
