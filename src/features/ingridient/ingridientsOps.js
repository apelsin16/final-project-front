import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api';

export const fetchIngredients = createAsyncThunk('ingredients/fetchAll', async (_, thunkAPI) => {
    try {
        const response = await axios.get('/ingredients');
        return response.data.ingredients;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
    }
});
