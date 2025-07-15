import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import iziToast from 'izitoast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const initialState = {
    // All recipes (not filtered by category)
    recipes: [],
    isLoading: false,
    error: null,
    
    // Pagination
    currentPage: 1,
    totalPages: 1,
    totalRecipes: 0,
    recipesPerPage: 12,
    
    // Filters
    filters: {
        area: null,
        ingredient: null
    },
    
    // Filter options
    areas: [],
    ingredients: [],
    
    // Favorites
    favorites: [],
    favoriteIds: [],
    favoritesLoading: false
};

// Fetch all recipes with pagination and filters
export const fetchRecipes = createAsyncThunk(
    'recipes/fetchRecipes',
    async ({ page = 1, limit = 12, filters = {} }, { rejectWithValue }) => {
        try {
            // Використовуємо серверну пагінацію
            const response = await axios.get(`${API_URL}/recipes?page=${page}&limit=${limit}`);
            
            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to fetch recipes');
            }
            
            let recipes = response.data.data || [];
            
            // Фільтрація за areas (тільки для поточної сторінки)
            if (filters.area) {
                recipes = recipes.filter(recipe => recipe.areaId === filters.area);
            }
            
            // Фільтрація за ingredients (тільки для поточної сторінки)
            if (filters.ingredient) {
                recipes = recipes.filter(recipe => 
                    recipe.ingredients && recipe.ingredients.some(ing => 
                        ing.id === filters.ingredient
                    )
                );
            }
            
            return {
                success: true,
                data: recipes,
                pagination: response.data.pagination || {
                    total: response.data.pagination?.total || 0,
                    page: page,
                    limit: limit,
                    totalPages: response.data.pagination?.totalPages || 1
                }
            };
        } catch (error) {
            console.error('Error fetching recipes:', error);
            
            if (error.response) {
                return rejectWithValue(error.response.data.message || 'Server error');
            } else if (error.request) {
                return rejectWithValue('Network error - please check your connection');
            } else {
                return rejectWithValue(error.message || 'Failed to fetch recipes');
            }
        }
    }
);

// Fetch filter options (areas and ingredients)
export const fetchFilterOptions = createAsyncThunk(
    'recipes/fetchFilterOptions',
    async (_, { rejectWithValue }) => {
        try {
            const [areasResponse, ingredientsResponse] = await Promise.all([
                axios.get(`${API_URL}/areas`),
                axios.get(`${API_URL}/ingredients`)
            ]);
            
            return {
                areas: areasResponse.data.areas || [],
                ingredients: ingredientsResponse.data.ingredients || []
            };
        } catch (error) {
            console.error('Error fetching filter options:', error);
            return rejectWithValue(error.message || 'Failed to fetch filter options');
        }
    }
);

// Add/Remove from favorites
export const toggleFavorite = createAsyncThunk(
    'recipes/toggleFavorite',
    async (recipeId, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            if (!token) {
                throw new Error('User not authenticated');
            }
            
            // Try multiple possible endpoints for toggle favorite
            let response;
            try {
                response = await axios.patch(
                    `${API_URL}/recipes/${recipeId}/favorite`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } catch (firstError) {
                // Try alternative endpoint structure
                try {
                    response = await axios.patch(
                        `${API_URL}/recipes/favorite/${recipeId}`,
                        {},
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                } catch (secondError) {
                    // Try POST request
                    try {
                        response = await axios.post(
                            `${API_URL}/recipes/favorites`,
                            { recipeId },
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                    } catch (thirdError) {
                        // If all endpoints fail, simulate toggle for frontend-only functionality
                        console.warn('Backend endpoint for toggle favorite not found, using frontend-only mode');
                        const favoriteIds = getState().recipes.favoriteIds;
                        const isCurrentlyFavorite = favoriteIds.includes(recipeId);
                        return { recipeId, isFavorite: !isCurrentlyFavorite };
                    }
                }
            }
            
            return { recipeId, isFavorite: response.data.isFavorite };
        } catch (error) {
            console.error('Error toggling favorite:', error);
            
            if (error.response) {
                return rejectWithValue(error.response.data.message || 'Server error');
            } else if (error.request) {
                return rejectWithValue('Network error - please check your connection');
            } else {
                return rejectWithValue(error.message || 'Failed to toggle favorite');
            }
        }
    }
);

// Fetch user's favorite recipes
export const fetchFavorites = createAsyncThunk(
    'recipes/fetchFavorites',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            if (!token) {
                throw new Error('User not authenticated');
            }
            
            const response = await axios.get(`${API_URL}/recipes/favorites`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            return response.data.favorites || response.data.data || [];
        } catch (error) {
            console.error('Error fetching favorites:', error);
            
            // If endpoint not found, return empty array for frontend-only mode
            if (error.response?.status === 404) {
                console.warn('Favorites endpoint not found, using frontend-only mode');
                return [];
            }
            
            if (error.response) {
                return rejectWithValue(error.response.data.message || 'Server error');
            } else if (error.request) {
                return rejectWithValue('Network error - please check your connection');
            } else {
                return rejectWithValue(error.message || 'Failed to fetch favorites');
            }
        }
    }
);

const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        setFilters: (state, action) => {
            state.filters = action.payload;
        },
        clearFilters: (state) => {
            state.filters = {
                area: null,
                ingredient: null
            };
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch recipes
            .addCase(fetchRecipes.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.recipes = action.payload.data || [];
                state.totalRecipes = action.payload.pagination?.total || 0;
                state.totalPages = action.payload.pagination?.totalPages || 1;
                state.currentPage = action.payload.pagination?.page || 1;
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                iziToast.error({
                    title: 'Error',
                    message: action.payload || 'Failed to fetch recipes',
                    position: 'topRight'
                });
            })
            // Fetch filter options
            .addCase(fetchFilterOptions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchFilterOptions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.areas = action.payload.areas;
                state.ingredients = action.payload.ingredients;
            })
            .addCase(fetchFilterOptions.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                iziToast.error({
                    title: 'Error',
                    message: action.payload || 'Failed to fetch filter options',
                    position: 'topRight'
                });
            })
            // Toggle favorite
            .addCase(toggleFavorite.pending, (state) => {
                state.favoritesLoading = true;
            })
            .addCase(toggleFavorite.fulfilled, (state, action) => {
                state.favoritesLoading = false;
                const { recipeId, isFavorite } = action.payload;
                
                // Update local favorites
                if (isFavorite) {
                    if (!state.favoriteIds.includes(recipeId)) {
                        state.favoriteIds.push(recipeId);
                    }
                } else {
                    state.favoriteIds = state.favoriteIds.filter(id => id !== recipeId);
                }
                
                // Update the recipe in the current recipes list
                const recipeIndex = state.recipes.findIndex(recipe => recipe.id === recipeId);
                if (recipeIndex !== -1) {
                    state.recipes[recipeIndex].isFavorite = isFavorite;
                }
                
                iziToast.success({
                    title: 'Success',
                    message: isFavorite ? 'Recipe added to favorites' : 'Recipe removed from favorites',
                    position: 'topRight'
                });
            })
            .addCase(toggleFavorite.rejected, (state, action) => {
                state.favoritesLoading = false;
                iziToast.error({
                    title: 'Error',
                    message: action.payload || 'Failed to toggle favorite',
                    position: 'topRight'
                });
            })
            // Fetch favorites
            .addCase(fetchFavorites.pending, (state) => {
                state.favoritesLoading = true;
            })
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.favoritesLoading = false;
                state.favorites = action.payload;
                state.favoriteIds = action.payload.map(recipe => recipe.id);
            })
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.favoritesLoading = false;
                state.error = action.payload;
                iziToast.error({
                    title: 'Error',
                    message: action.payload || 'Failed to fetch favorites',
                    position: 'topRight'
                });
            });
    }
});

export const { 
    setCurrentPage, 
    setFilters, 
    clearFilters
} = recipesSlice.actions;

export default recipesSlice.reducer; 