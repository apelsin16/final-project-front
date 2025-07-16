import { createSlice, createSelector } from '@reduxjs/toolkit';
import {fetchIngridients} from './ingridientsOps';

const ingridientsSlice = createSlice({
    name: 'ingridients',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngridients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchIngridients.fulfilled, (state, action) => {
                state.loading = false;
                state.ingridients = action.payload;
            })
            .addCase(fetchIngridients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});

export const selectIngridients = (state) => state.ingridients.items || [];
export const selectLoading = (state) => state.ingridients.loading;
export const selectError = (state) => state.ingridients.error;

export default ingridientsSlice.reducer;