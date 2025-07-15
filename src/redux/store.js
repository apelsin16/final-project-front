import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';
import modalReducer from '../features/modal/modalSlice';
import categoriesReducer from '../features/categories/categoriesSlice.js';

export const store = configureStore({
    reducer: {
        auth: authReducer, // authReducer для авторизації
        modal: modalReducer, // modalReducer для модалок
        categories: categoriesReducer, // categoriesReducer для категорій та рецептів
    },
});
