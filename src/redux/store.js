// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice'; // ✅ import userSlice
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});
