import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import studyReducer from '../features/studies/studySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    studies: studyReducer,
  },
});
