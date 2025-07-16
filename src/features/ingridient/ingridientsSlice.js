import { createSlice, createSelector } from '@reduxjs/toolkit';
import {fetchIngredients} from './ingridientsOps';

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchIngredients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});

export const selectIngredients = (state) => state.ingredients.items || [];
export const selectLoading = (state) => state.ingredients.loading;
export const selectError = (state) => state.ingredients.error;

export default ingredientsSlice.reducer;