import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainTitle from '../common/ui/MainTitle/MainTitle';
import Subtitle from '../common/ui/Subtitle/Subtitle';
import Button from '../common/ui/Button/Button';
import RecipeFilters from '../RecipeFilters/RecipeFilters';
import RecipeList from '../RecipeList/RecipeList';
import RecipePagination from '../RecipePagination/RecipePagination';
import { 
    fetchRecipes, 
    fetchFilterOptions, 
    setFilters, 
    setCurrentPage, 
    clearFilters 
} from '../../features/recipes/recipesSlice';
import styles from './AllRecipes.module.css';

const AllRecipes = ({ onBack }) => {
    const dispatch = useDispatch();
    const { 
        recipes, 
        isLoading, 
        error, 
        currentPage, 
        totalPages, 
        totalRecipes,
        filters,
        areas,
        ingredients
    } = useSelector(state => state.recipes);

    // Завантаження фільтрів при монтуванні
    useEffect(() => {
        if (areas.length === 0 || ingredients.length === 0) {
            dispatch(fetchFilterOptions());
        }
    }, [dispatch, areas.length, ingredients.length]);

    // Завантаження рецептів при монтуванні або зміні параметрів
    useEffect(() => {
        dispatch(fetchRecipes({ 
            page: currentPage, 
            limit: 12, 
            filters 
        }));
    }, [dispatch, currentPage, filters]);

    const handleFilterChange = (newFilters) => {
        dispatch(setFilters(newFilters));
        dispatch(setCurrentPage(1));
    };

    const handlePageChange = (page) => {
        dispatch(setCurrentPage(page));
    };

    const handleClearFilters = () => {
        dispatch(clearFilters());
        dispatch(setCurrentPage(1));
    };

    const handleBack = () => {
        if (onBack) {
            onBack();
        }
    };

    const hasActiveFilters = filters.area || filters.ingredient;

    return (
        <section className={styles.allRecipes}>
            <div className={styles.header}>
                <button className={styles.backButton} onClick={handleBack}>
                    <svg className={styles.backIcon} viewBox="0 0 18 18" fill="none">
                        <path 
                            d="M7.5 7.5L9 14.3" 
                            stroke="#050505" 
                            strokeWidth="1.5" 
                            strokeLinecap="round" 
                            transform="rotate(-135 9 9)"
                        />
                    </svg>
                    <span className={styles.backText}>Back</span>
                </button>
                
                <MainTitle>ALL RECIPES</MainTitle>
                <Subtitle>
                    Explore our complete collection of delicious recipes from around the world. 
                    Use filters to find exactly what you're looking for.
                </Subtitle>
            </div>
            
            <div className={styles.content}>
                <div className={styles.filtersSection}>
                    <RecipeFilters 
                        filters={filters} 
                        onFiltersChange={handleFilterChange}
                        areas={areas}
                        ingredients={ingredients}
                    />
                    
                    {hasActiveFilters && (
                        <Button 
                            variant="outline" 
                            onClick={handleClearFilters}
                            className={styles.clearFiltersButton}
                        >
                            Clear Filters
                        </Button>
                    )}
                </div>
                
                <div className={styles.recipesSection}>

                    
                    <RecipeList 
                        recipes={recipes} 
                        isLoading={isLoading}
                    />
                    
                    <RecipePagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </section>
    );
};

export default AllRecipes; 