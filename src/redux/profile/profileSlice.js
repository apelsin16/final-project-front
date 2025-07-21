// src/redux/profile/profileSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  deleteRecipe,
  fetchUserFavoritesRecipes,
  fetchUserFollowers,
  fetchUserFollowing,
  fetchUserRecipes,
  followUser,
  removeFavoriteRecipe,
  unfollowUser,
  fetchOtherUserRecipes,
  addFavoriteRecipe,
  fetchOtherUserFollowers,
} from './profileOperations';

const getInitialPagination = () => ({
  currentPage: 1,
  totalPages: 1,
  totalRecipes: 0,
  recipesPerPage: 9,
  hasNextPage: false,
});

const initialState = {
  recipes: [],
  pagination: getInitialPagination(),
  favorites: [],
  favoritesPagination: getInitialPagination(),
  followers: [],
  followersPagination: {
    ...getInitialPagination(),
    totalFollowers: 0,
  },
  following: [],
  followingPagination: {
    ...getInitialPagination(),
    totalFollowing: 0,
  },
  otherRecipes: [],
  otherRecipesPagination: getInitialPagination(),
  otherFollowers: [],
  otherFollowersPagination: {
    ...getInitialPagination(),
    totalFollowers: 0,
  },
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(addFavoriteRecipe.fulfilled, (state, { payload }) => {
        if (!state.favorites.some(recipe => recipe.id === payload.id)) {
          state.favorites.push(payload);
          state.favoritesPagination.totalRecipes += 1;
        }
      })
      .addCase(fetchUserRecipes.fulfilled, (state, { payload }) => {
        state.recipes = payload.recipes;
        state.pagination = payload.pagination;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserFavoritesRecipes.fulfilled, (state, { payload }) => {
        state.favorites = payload.favorites;
        state.favoritesPagination = payload.pagination;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserFollowers.fulfilled, (state, { payload }) => {
        state.followers = payload.followers;
        state.followersPagination = payload.pagination;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUserFollowing.fulfilled, (state, { payload }) => {
        state.following = payload.following;
        state.followingPagination = payload.pagination;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOtherUserRecipes.fulfilled, (state, { payload }) => {
        state.otherRecipes = payload.recipes;
        state.otherRecipesPagination = payload.pagination;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOtherUserFollowers.fulfilled, (state, { payload }) => {
        state.otherFollowers = payload.followers;
        state.otherFollowersPagination = payload.pagination;
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteRecipe.fulfilled, (state, { meta }) => {
        const deletedId = meta.arg;
        state.recipes = state.recipes.filter(({ id }) => id !== deletedId);
        state.pagination.totalRecipes -= 1;
        if (state.pagination.totalRecipes <= 9) {
          state.pagination.currentPage = 1;
        } else if (
          state.recipes.length === 0 &&
          state.pagination.currentPage > 1
        ) {
          state.pagination.currentPage -= 1;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(removeFavoriteRecipe.fulfilled, (state, { payload }) => {
        const removedId = payload.id;
        state.favorites = state.favorites.filter(({ id }) => id !== removedId);
        state.favoritesPagination.totalRecipes -= 1;
        if (state.favoritesPagination.totalRecipes <= 9) {
          state.favoritesPagination.currentPage = 1;
        } else if (
          state.favorites.length === 0 &&
          state.favoritesPagination.currentPage > 1
        ) {
          state.favoritesPagination.currentPage -= 1;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(followUser.fulfilled, (state, { payload }) => {
        if (!state.following.some(user => user.id === payload.id)) {
          state.following.push(payload);
          state.followingPagination.totalFollowing += 1;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(unfollowUser.fulfilled, (state, { payload }) => {
        state.following = state.following.filter(user => user.id !== payload);
        state.followingPagination.totalFollowing -= 1;
        if (state.followingPagination.totalFollowing <= 9) {
          state.followingPagination.currentPage = 1;
        } else if (
          state.following.length === 0 &&
          state.followingPagination.currentPage > 1
        ) {
          state.followingPagination.currentPage -= 1;
        }
        state.loading = false;
        state.error = null;
      })
      .addMatcher(
        action => action.type.endsWith('/pending'),
        state => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || 'Something went wrong';
        }
      ),
});

export const profileReducer = profileSlice.reducer;
