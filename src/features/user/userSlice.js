import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

const initialState = {
    current: null,
    viewed: null,
    following: [],
    followers: [],
    status: 'idle',
    error: null,
};

export const fetchUserById = createAsyncThunk(
    'user/fetchUserById',
    async (userId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${API_URL}/users/${userId}`);
            return { userId, user: data }; // нормалізуємо payload
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const updateUserAvatar = createAsyncThunk(
    'user/updateUserAvatar',
    async (file, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('avatar', file);

            const { data } = await axios.patch(`${API_URL}/users/avatars`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return data; // очікується, що бекенд поверне оновленого користувача або avatarURL
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Async Thunks
export const followUser = createAsyncThunk(
    'user/followUser',
    async (userId, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${API_URL}/users/follow/${userId}`);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const unfollowUser = createAsyncThunk(
    'user/unfollowUser',
    async (userId, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`${API_URL}/users/${userId}/unfollow`);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const fetchFollowers = createAsyncThunk(
    'user/fetchFollowers',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${API_URL}/users/followers`);
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser(state, action) {
            state.current = action.payload;
        },
        clearViewedUser(state) {
            state.viewed = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(followUser.fulfilled, (state, action) => {
                state.following.push(action.payload);
            })
            .addCase(unfollowUser.fulfilled, (state, action) => {
                state.following = state.following.filter(user => user._id !== action.payload._id);
            })
            .addCase(fetchFollowers.fulfilled, (state, action) => {
                state.followers = action.payload;
            })
            .addCase(updateUserAvatar.fulfilled, (state, action) => {
                if (state.current) {
                    state.current.avatarURL = action.payload.avatarURL;
                }
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                const { userId, user } = action.payload;
                if (
                    state.current &&
                    (state.current.id === userId || state.current._id === userId)
                ) {
                    // якщо отримали дані про себе — оновлюємо current
                    state.current = { ...state.current, ...user };
                } else {
                    state.viewed = user;
                }
            })
            .addMatcher(
                action => action.type.startsWith('user/') && action.type.endsWith('/pending'),
                state => {
                    state.status = 'loading';
                }
            )
            .addMatcher(
                action => action.type.startsWith('user/') && action.type.endsWith('/fulfilled'),
                state => {
                    state.status = 'succeeded';
                }
            )
            .addMatcher(
                action => action.type.startsWith('user/') && action.type.endsWith('/rejected'),
                (state, action) => {
                    state.status = 'failed';
                    state.error = action.payload;
                }
            )
            .addMatcher(
                action => action.type.startsWith('user/') && action.type.endsWith('/pending'),
                state => {
                    state.status = 'loading';
                }
            )
            .addMatcher(
                action => action.type.startsWith('user/') && action.type.endsWith('/fulfilled'),
                state => {
                    state.status = 'succeeded';
                }
            )
            .addMatcher(
                action => action.type.startsWith('user/') && action.type.endsWith('/rejected'),
                (state, action) => {
                    state.status = 'failed';
                    state.error = action.payload;
                }
            );
    },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
