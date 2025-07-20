import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategories = createAsyncThunk('recipes/fetchCategories', async () => {
    const res = await axios.get('/categories');
    return res.data;
});

export const fetchIngredients = createAsyncThunk('recipes/fetchIngredients', async () => {
    const res = await axios.get('/ingredients');
    return res.data;
});

export const createRecipe = createAsyncThunk(
    'recipes/createRecipe',
    async (formData, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        try {
            const res = await axios.post('/recipes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data.message);
        }
    }
);

const recipeSlice = createSlice({
    name: 'recipes',
    initialState: {
        categories: [],
        ingredients: [],
        status: null,
        error: null,
        favoriteIds: [],
    },
    reducers: {
        toggleFavorite: (state, action) => {
            const recipeId = action.payload;
            if (state.favoriteIds.includes(recipeId)) {
                state.favoriteIds = state.favoriteIds.filter(id => id !== recipeId);
            } else {
                state.favoriteIds.push(recipeId);
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.categories = action.payload;
            })
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.ingredients = action.payload;
            })
            .addCase(createRecipe.pending, state => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(createRecipe.fulfilled, state => {
                state.status = 'succeeded';
            })
            .addCase(createRecipe.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { toggleFavorite } = recipeSlice.actions;
export default recipeSlice.reducer;
