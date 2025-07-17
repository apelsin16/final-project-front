import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import authReducer from '../features/auth/authSlice.js';
import modalReducer from '../features/modal/modalSlice';
import recipeReducer from '../features/recipe/recipeSlice.js';
import {profileReducer} from './profile/profileSlice.js';
import ingridientsSlice from "../features/ingridient/ingridientsSlice.js"
import categoriesReducer from '../features/categories/categoriesSlice.js';
import recipesReducer from '../features/recipes/recipesSlice.js';

export const store = configureStore({
    reducer: {
        auth: authReducer, // authReducer для авторизації
        modal: modalReducer, // modalReducer для модалок
        user: userReducer,
        recipe: recipeReducer,
        profile: profileReducer,
        ingredients: ingridientsSlice,
        categories: categoriesReducer, // categoriesReducer для категорій та рецептів
        recipes: recipesReducer, // recipesReducer для загальних рецептів
    },
});
