import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import iziToast from 'izitoast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const initialState = {
    categories: [],
    isLoading: false,
    error: null,
    // State for recipes by category
    recipes: [],
    selectedCategory: null,
    recipesLoading: false,
    recipesError: null,
    totalPages: 1,
    currentPage: 1,
    totalRecipes: 0,
    // Filter states
    ingredients: [],
    areas: [],
    filters: {
        ingredient: null,
        area: null,
    },
};

// Fetch all categories
export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/categories`);
            return response.data.categories || response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
        }
    }
);

// Fetch recipes by category
export const fetchRecipesByCategory = createAsyncThunk(
    'categories/fetchRecipesByCategory',
    async ({ categoryId, categoryName, page = 1, filters = {} }, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: '12',
            });

            let hasFilters = false;
            
            if (filters.ingredient) {
                params.append('ingredient', filters.ingredient);
                hasFilters = true;
            }
            if (filters.area) {
                params.append('area', filters.area);
                hasFilters = true;
            }
            
            let url;
            if (hasFilters) {
                // Use general endpoint with category name when filters are present
                params.append('category', categoryName || categoryId);
                url = `${API_URL}/recipes?${params}`;
            } else {
                // Use specific endpoint when no filters
                url = `${API_URL}/recipes/category/${categoryId}?${params}`;
            }
            
            const response = await axios.get(url);
            
            const recipes = response.data.data || [];
            const totalPages = response.data.pagination?.totalPages || 1;
            const currentPage = response.data.pagination?.currentPage || page;
            const totalRecipes = response.data.pagination?.totalRecipes || response.data.pagination?.total || 0;
            
            // Pagination info available in Redux DevTools
            
            return {
                recipes,
                totalPages,
                currentPage,
                totalRecipes,
                categoryId,
                categoryName,
            };
        } catch (error) {
            console.error('Error fetching recipes:', error);
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch recipes');
        }
    }
);

// Fetch ingredients for filters
export const fetchIngredients = createAsyncThunk(
    'categories/fetchIngredients',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/ingredients`);
            return response.data.ingredients || response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch ingredients');
        }
    }
);

// Fetch areas for filters
export const fetchAreas = createAsyncThunk(
    'categories/fetchAreas',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/areas`);
            return response.data.areas || response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch areas');
        }
    }
);

// Fetch ingredients by category for filters
export const fetchIngredientsByCategory = createAsyncThunk(
    'categories/fetchIngredientsByCategory',
    async (categoryName, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/ingredients?category=${categoryName}`);
            return response.data.ingredients || response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch ingredients');
        }
    }
);

// Fetch areas by category for filters
export const fetchAreasByCategory = createAsyncThunk(
    'categories/fetchAreasByCategory',
    async (categoryName, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/areas?category=${categoryName}`);
            return response.data.areas || response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch areas');
        }
    }
);

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        clearSelectedCategory: state => {
            state.selectedCategory = null;
            state.recipes = [];
            state.recipesError = null;
            state.currentPage = 1;
            state.totalRecipes = 0;
        },
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
            state.currentPage = 1; // Reset to first page when filters change
        },
        clearFilters: state => {
            state.filters = {
                ingredient: null,
                area: null,
            };
            state.currentPage = 1;
            state.totalRecipes = 0;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        clearError: state => {
            state.error = null;
            state.recipesError = null;
        },
    },
    extraReducers: builder => {
        builder
            // Fetch categories
            .addCase(fetchCategories.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                iziToast.error({
                    title: 'Error',
                    message: action.payload || 'Failed to fetch categories',
                    timeout: 7000,
                });
            })

            // Fetch recipes by category
            .addCase(fetchRecipesByCategory.pending, state => {
                state.recipesLoading = true;
                state.recipesError = null;
            })
            .addCase(fetchRecipesByCategory.fulfilled, (state, action) => {
                state.recipesLoading = false;
                state.recipes = action.payload.recipes;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
                state.totalRecipes = action.payload.totalRecipes;
                
                // Якщо поточна сторінка більша за загальну кількість сторінок, 
                // автоматично переходимо на останню сторінку
                if (state.currentPage > state.totalPages && state.totalPages > 0) {
                    state.currentPage = state.totalPages;
                }
            })
            .addCase(fetchRecipesByCategory.rejected, (state, action) => {
                state.recipesLoading = false;
                state.recipesError = action.payload;
                iziToast.error({
                    title: 'Error',
                    message: action.payload || 'Failed to fetch recipes',
                    timeout: 7000,
                });
            })

            // Fetch ingredients
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.ingredients = action.payload;
            })
            .addCase(fetchIngredients.rejected, (state, action) => {
                iziToast.error({
                    title: 'Error',
                    message: action.payload || 'Failed to fetch ingredients',
                    timeout: 7000,
                });
            })

            // Fetch areas
            .addCase(fetchAreas.fulfilled, (state, action) => {
                state.areas = action.payload;
            })
            .addCase(fetchAreas.rejected, (state, action) => {
                iziToast.error({
                    title: 'Error',
                    message: action.payload || 'Failed to fetch areas',
                    timeout: 7000,
                });
            })

            // Fetch ingredients by category
            .addCase(fetchIngredientsByCategory.fulfilled, (state, action) => {
                state.ingredients = action.payload;
            })
            .addCase(fetchIngredientsByCategory.rejected, (state, action) => {
                iziToast.error({
                    title: 'Error',
                    message: action.payload || 'Failed to fetch ingredients',
                    timeout: 7000,
                });
            })

            // Fetch areas by category
            .addCase(fetchAreasByCategory.fulfilled, (state, action) => {
                state.areas = action.payload;
            })
            .addCase(fetchAreasByCategory.rejected, (state, action) => {
                iziToast.error({
                    title: 'Error',
                    message: action.payload || 'Failed to fetch areas',
                    timeout: 7000,
                });
            });
    },
});

export const { setSelectedCategory, clearSelectedCategory, setFilters, clearFilters, clearError, setCurrentPage } =
    categoriesSlice.actions;

export default categoriesSlice.reducer;
