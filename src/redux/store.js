import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';
import modalReducer from '../features/modal/modalSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer, // authReducer для авторизації
        modal: modalReducer, // modalReducer для модалок
    },
});
