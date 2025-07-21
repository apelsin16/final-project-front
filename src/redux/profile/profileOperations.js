import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL =
  import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api';

const authRequest = async (method, url, getState, options = {}) => {
  const token = getState().auth.token;
  const headers = {
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  try {
    const response = await axios({ method, url, headers, ...options });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message };
  }
};

export const fetchUserRecipes = createAsyncThunk(
  'profile/fetchUserRecipes',
  async ({ page = 1, limit = 9 }, { getState, rejectWithValue }) => {
    try {
      return await authRequest('get', '/recipes/own', getState, {
        params: { page, limit },
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchUserFavoritesRecipes = createAsyncThunk(
  'profile/fetchUserFavoritesRecipes',
  async ({ page = 1, limit = 9 }, { getState, rejectWithValue }) => {
    try {
      return await authRequest('get', '/recipes/favorites', getState, {
        params: { page, limit },
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchUserFollowers = createAsyncThunk(
  'profile/fetchUserFollowers',
  async ({ page = 1, limit = 9 }, { getState, rejectWithValue }) => {
    try {
      return await authRequest('get', '/users/followers', getState, {
        params: { page, limit },
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchUserFollowing = createAsyncThunk(
  'profile/fetchUserFollowing',
  async ({ page = 1, limit = 9 }, { getState, rejectWithValue }) => {
    try {
      return await authRequest('get', '/users/following', getState, {
        params: { page, limit },
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchOtherUserRecipes = createAsyncThunk(
  'profile/fetchOtherUserRecipes',
  async ({ userId, page = 1, limit = 9 }, { getState, rejectWithValue }) => {
    try {
      return await authRequest('get', `/recipes/user/${userId}`, getState, {
        params: { page, limit },
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchOtherUserFollowers = createAsyncThunk(
  'profile/fetchOtherUserFollowers',
  async ({ userId, page = 1, limit = 9 }, { getState, rejectWithValue }) => {
    try {
      return await authRequest('get', `/users/${userId}/followers`, getState, {
        params: { page, limit },
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteRecipe = createAsyncThunk(
  'profile/deleteRecipe',
  async (id, { getState, rejectWithValue }) => {
    try {
      return await authRequest('delete', `/recipes/${id}`, getState);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addFavoriteRecipe = createAsyncThunk(
  'profile/addFavoriteRecipe',
  async (id, { getState, rejectWithValue }) => {
    try {
      const data = await authRequest('post', `/recipes/${id}/favorite`, getState);
      return { id, ...data };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const removeFavoriteRecipe = createAsyncThunk(
  'profile/removeFavoriteRecipe',
  async (id, { getState, rejectWithValue }) => {
    try {
      const data = await authRequest(
        'delete',
        `/recipes/${id}/favorite`,
        getState
      );
      return { id, ...data };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const followUser = createAsyncThunk(
  'profile/followUser',
  async (userId, { getState, rejectWithValue, dispatch }) => {
    try {
      const data = await authRequest(
        'post',
        `/users/follow/${userId}`,
        getState
      );
      dispatch(fetchUserFollowers({ page: 1, limit: 9 }));
      dispatch(fetchUserFollowing({ page: 1, limit: 9 }));
      return { id: userId, ...data };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  'profile/unfollowUser',
  async (userId, { getState, rejectWithValue, dispatch }) => {
    try {
      await authRequest('delete', `/users/follow/${userId}`, getState);
      dispatch(fetchUserFollowers({ page: 1, limit: 9 }));
      dispatch(fetchUserFollowing({ page: 1, limit: 9 }));
      return userId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
