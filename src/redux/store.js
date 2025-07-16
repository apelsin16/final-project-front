import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import authReducer from '../features/auth/authSlice.js';
import modalReducer from '../features/modal/modalSlice';
import recipeReducer from '../features/recipe/recipeSlice.js';
import { profileReducer } from './profile/profileSlice.js';

export const store = configureStore({
  reducer: {
    auth: authReducer, // authReducer для авторизації
    modal: modalReducer, // modalReducer для модалок
    user: userReducer,
    recipe: recipeReducer,
    profile: profileReducer,
  },
});
