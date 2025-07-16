import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api';

export const fetchIngridients = createAsyncThunk(
    'ingridients/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('/ingridients');
            console.log(response);
            
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);
