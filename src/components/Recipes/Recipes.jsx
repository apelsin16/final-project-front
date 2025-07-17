import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainTitle from '../common/ui/MainTitle/MainTitle';
import Subtitle from '../common/ui/Subtitle/Subtitle';

import RecipeFilters from '../RecipeFilters/RecipeFilters';
import RecipeList from '../RecipeList/RecipeList';
import RecipePagination from '../RecipePagination/RecipePagination';
import {
    fetchRecipesByCategory,
    fetchIngredientsByCategory,
    fetchAreasByCategory,
    setFilters,
    clearSelectedCategory,
    setCurrentPage,
    setSelectedCategory,
} from '../../features/categories/categoriesSlice.js';
import styles from './Recipes.module.css';

const Recipes = ({ category, onBack }) => {
    const dispatch = useDispatch();
    const {
        recipes,
        recipesLoading,
        selectedCategory,
        totalPages,
        currentPage,
        totalRecipes,
        filters,
        ingredients,
        areas,
    } = useSelector(state => state.categories);

    // Встановлюємо selectedCategory і скидаємо сторінку при зміні категорії
    useEffect(() => {
        if (category?.id !== selectedCategory?.id) {
            dispatch(setCurrentPage(1));
            if (category) dispatch(setSelectedCategory(category));

            // Скидаємо фільтри при переході на нову категорію
            dispatch(setFilters({ ingredient: null, area: null }));
        }
    }, [dispatch, category?.id, selectedCategory?.id]);

    // Завантажуємо рецепти при зміні категорії, фільтрів або сторінки
    useEffect(() => {
        dispatch(
            fetchRecipesByCategory({
                categoryId: category?.id,
                categoryName: category?.name,
                page: currentPage,
                filters,
            })
        );
    }, [dispatch, category?.id, filters, currentPage]);

    // Автоматично переходимо на останню сторінку, якщо поточна сторінка більша за загальну кількість
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            dispatch(setCurrentPage(totalPages));
        }
    }, [currentPage, totalPages, dispatch]);

    const handleFilterChange = newFilters => {
        dispatch(setFilters(newFilters));
    };

    const handlePageChange = page => {
        dispatch(setCurrentPage(page));
    };

    const handleBack = () => {
        dispatch(clearSelectedCategory());
        dispatch(setCurrentPage(1)); // Скидаємо на першу сторінку при поверненні
        if (onBack) {
            onBack();
        }
    };

    const categoryName = category?.name || 'All recipes';
    const categoryDescription =
        'Go on a taste journey, where every sip is a sophisticated creative chord, and every dessert is an expression of the most refined gastronomic desires.';

    // Pagination info available in Redux DevTools

    return (
        <section className={styles.recipes}>
            <div className={styles.recipesHeader}>
                <button className={styles.backButton} onClick={handleBack}>
                    <svg
                        className={styles.backIcon}
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12.7136 8.00058L3.28549 7.99956"
                            stroke="#050505"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M7.99902 12.7141L3.28549 7.99956L8.00004 3.28602"
                            stroke="#050505"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <span className={styles.backText}>Back</span>
                </button>
                <MainTitle>{categoryName}</MainTitle>
                <Subtitle limitWidth>{categoryDescription}</Subtitle>
            </div>

            <div className={styles.recipesContent}>
                <RecipeFilters
                    filters={filters}
                    onFiltersChange={handleFilterChange}
                    ingredients={ingredients}
                    className={styles.recipesFilters}
                    areas={areas}
                />

                <div className={styles.recipesMain}>
                    <RecipeList recipes={recipes} isLoading={recipesLoading} />

                    <RecipePagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        className={styles.recipesPagination}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </section>
    );
};

export default Recipes;
