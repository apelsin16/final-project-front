import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import iziToast from 'izitoast';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api';

const initialState = {
    user: null, // поточний користувач
    token: null, // JWT токен
    isLoading: false, // статус завантаження
    error: null, // текст помилки
    isAuth: false, // чи залогінений
    isSessionLoading: false, // глобальний лоадер для відновлення сесії
};

// Реєстрація
export const register = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${API}/users/register`, data);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message);
    }
});

// Логін
export const login = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${API}/users/login`, data);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message);
    }
});

// Логаут
export const logout = createAsyncThunk('auth/logout', async (_, { getState, rejectWithValue }) => {
    try {
        const token = getState().auth.token;
        await axios.post(
            `${API}/users/logout`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message);
    }
});

// Отримати поточного користувача по токену
export const fetchCurrentUser = createAsyncThunk(
    'auth/fetchCurrentUser',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token || localStorage.getItem('token');
            if (!token) throw new Error('No token');
            const res = await axios.get(`${API}/users/current`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return { ...res.data, token };
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Session expired');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetError(state) {
            state.error = null;
        },
        setSessionLoading(state, action) {
            state.isSessionLoading = action.payload;
        },
    },
    extraReducers: builder => {
        builder

            // register
            .addCase(register.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.user = payload.user;
                state.token = payload.token;
                state.isAuth = true;
                localStorage.setItem('token', payload.token);
            })
            .addCase(register.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
                iziToast.error({
                    title: 'Error',
                    message: payload || 'Registration failed',
                    timeout: 7000,
                });
            })

            // login
            .addCase(login.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.user = payload.user;
                state.token = payload.token;
                state.isAuth = true;
                localStorage.setItem('token', payload.token);
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
                iziToast.error({
                    title: 'Error',
                    message: payload || 'Login failed',
                    timeout: 7000,
                });
            })

            // logout
            .addCase(logout.fulfilled, state => {
                state.user = null;
                state.token = null;
                state.isAuth = false;
                localStorage.removeItem('token');
                // iziToast.success прибрано — успіх не показуємо
            })
            .addCase(logout.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
                state.user = null;
                state.token = null;
                state.isAuth = false;
                localStorage.removeItem('token');
                iziToast.error({
                    title: 'Error',
                    message: payload || 'Logout failed',
                    timeout: 7000,
                });
            })
            // fetchCurrentUser
            .addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {
                const { token, ...user } = payload;
                state.user = user;
                state.token = token;
                state.isAuth = true;
            })
            .addCase(fetchCurrentUser.rejected, state => {
                state.user = null;
                state.token = null;
                state.isAuth = false;
                localStorage.removeItem('token');
            });
    },
});

export const { resetError, setSessionLoading } = authSlice.actions;
export default authSlice.reducer;
