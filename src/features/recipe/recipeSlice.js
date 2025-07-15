// features/recipes/recipeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategories = createAsyncThunk(
  'recipes/fetchCategories',
  async () => {
    const res = await axios.get('/api/categories');
    return res.data;
  }
);

export const fetchIngredients = createAsyncThunk(
  'recipes/fetchIngredients',
  async () => {
    const res = await axios.get('/api/ingredients');
    return res.data;
  }
);

export const createRecipe = createAsyncThunk(
  'recipes/createRecipe',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/recipes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
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
  },
  reducers: {},
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
  }
});

export default recipeSlice.reducer;
