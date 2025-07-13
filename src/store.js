import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import modalReducer from "./features/modal/modalSlice";
import userReducer from "./features/user/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer, // authReducer для авторизації
    modal: modalReducer, // modalReducer для модалок
    user: userReducer,
  },
});
