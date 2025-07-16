import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainTitle from '../common/ui/MainTitle/MainTitle';
import Subtitle from '../common/ui/Subtitle/Subtitle';
import Button from '../common/ui/Button/Button';
import RecipeFilters from '../RecipeFilters/RecipeFilters';
import RecipeList from '../RecipeList/RecipeList';
import RecipePagination from '../RecipePagination/RecipePagination';
import {
    fetchRecipesByCategory,
    fetchIngredients,
    fetchAreas,
    setFilters,
    clearSelectedCategory,
} from '../../features/categories/categoriesSlice.js';
import styles from './Recipes.module.css';

const Recipes = ({ category, onBack }) => {
    const dispatch = useDispatch();
    const {
        recipes,
        recipesLoading,
        recipesError,
        selectedCategory,
        totalPages,
        currentPage,
        filters,
        ingredients,
        areas,
    } = useSelector(state => state.categories);

    // Мок дані для рецептів
    const mockRecipes = [
        {
            id: 1,
            title: 'Bakewell tart',
            description:
                'To make the pastry, measure the flour into a bowl and rub in the butter with your fingertips until the mixture resembles fine breadcrumbs.',
            image: '/src/assets/images/desserts.jpg',
            author: {
                id: 1,
                name: 'Ivetta',
                avatar: '/src/assets/images/desserts.jpg',
            },
            isFavorite: false,
        },
        {
            id: 2,
            title: 'Chinon Apple Tarts',
            description:
                'To make the red wine jelly, put the red wine, jam sugar, star anise, clove, cinnamon stick, allspice, split vanilla pod and seeds in a medium saucepan.',
            image: '/src/assets/images/desserts.jpg',
            author: {
                id: 2,
                name: 'Nadia',
                avatar: '/src/assets/images/desserts.jpg',
            },
            isFavorite: true,
        },
        {
            id: 3,
            title: 'Sticky Toffee Pudding',
            description:
                'Preheat the oven to 180C/160C Fan/Gas 4. Butter a wide shallow 1.7-litre/3-pint ovenproof dish. Put the butter, sugar, eggs, flour, baking powder, bicarbonate of soda and treacle into a mixing bowl.',
            image: '/src/assets/images/desserts.jpg',
            author: {
                id: 3,
                name: 'Mykhailo',
                avatar: '/src/assets/images/desserts.jpg',
            },
            isFavorite: false,
        },
        {
            id: 4,
            title: 'Carrot Cake',
            description: 'For the carrot cake, preheat the oven to 160C/325F/Gas 3.',
            image: '/src/assets/images/desserts.jpg',
            author: {
                id: 4,
                name: 'Vlad',
                avatar: '/src/assets/images/desserts.jpg',
            },
            isFavorite: false,
        },
        {
            id: 5,
            title: 'Eccles Cakes',
            description:
                'To make the pastry, dice the butter and put it in the freezer to go really hard.',
            image: '/src/assets/images/desserts.jpg',
            author: {
                id: 5,
                name: 'Victoria',
                avatar: '/src/assets/images/desserts.jpg',
            },
            isFavorite: true,
        },
        {
            id: 6,
            title: 'Apam balik',
            description:
                'Mix milk, oil and egg together. Sift flour, baking powder and salt into the mixture.',
            image: '/src/assets/images/desserts.jpg',
            author: {
                id: 6,
                name: 'Andrew',
                avatar: '/src/assets/images/desserts.jpg',
            },
            isFavorite: false,
        },
        {
            id: 7,
            title: 'Apple Frangipan Tart',
            description:
                'Preheat the oven to 200C/180C Fan/Gas 6. Put the biscuits in a large re-sealable freezer bag and bash with a rolling pin into fine crumbs.',
            image: '/src/assets/images/desserts.jpg',
            author: {
                id: 7,
                name: 'Olena',
                avatar: '/src/assets/images/desserts.jpg',
            },
            isFavorite: false,
        },
        {
            id: 8,
            title: 'Treacle Tart',
            description:
                'Preheat the oven to 200C/180C Fan/Gas 6. Put the biscuits in a large re-sealable freezer bag and bash with a rolling pin into fine crumbs.',
            image: '/src/assets/images/desserts.jpg',
            author: {
                id: 8,
                name: 'Victor',
                avatar: '/src/assets/images/desserts.jpg',
            },
            isFavorite: false,
        },
        {
            id: 9,
            title: 'Peanut Butter Cheeseca...',
            description:
                'Oil and line a 20cm round loose- bottomed cake tin with cling film, making it as smooth as possible.',
            image: '/src/assets/images/desserts.jpg',
            author: {
                id: 9,
                name: 'Oleg',
                avatar: '/src/assets/images/desserts.jpg',
            },
            isFavorite: false,
        },
        {
            id: 10,
            title: 'Rocky Road Fudge',
            description:
                'Line an 8-inch-square baking pan with wax paper or foil, and coat with non-stick spray.',
            image: '/src/assets/images/desserts.jpg',
            author: {
                id: 10,
                name: 'Ilona',
                avatar: '/src/assets/images/desserts.jpg',
            },
            isFavorite: false,
        },
        {
            id: 11,
            title: 'Cashew Ghoriba Biscuits',
            description:
                'Preheat the oven at 180 C / Gas 4. Line a baking tray with greaseproof paper.',
            image: '/src/assets/images/desserts.jpg',
            author: {
                id: 11,
                name: 'Dmytro',
                avatar: '/src/assets/images/desserts.jpg',
            },
            isFavorite: false,
        },
        {
            id: 12,
            title: 'Krispy Kreme Donut',
            description: 'Dissolve yeast in warm water in 2 1/2-quart bowl.',
            image: '/src/assets/images/desserts.jpg',
            author: {
                id: 12,
                name: 'Julia',
                avatar: '/src/assets/images/desserts.jpg',
            },
            isFavorite: false,
        },
    ];

    // Завантажуємо інгредієнти та області при монтуванні
    useEffect(() => {
        if (ingredients.length === 0) {
            dispatch(fetchIngredients());
        }
        if (areas.length === 0) {
            dispatch(fetchAreas());
        }
    }, [dispatch, ingredients.length, areas.length]);

    // Завантажуємо рецепти при зміні категорії, фільтрів або сторінки
    useEffect(() => {
        if (category) {
            dispatch(
                fetchRecipesByCategory({
                    categoryId: category.id || category.name,
                    page: currentPage,
                    filters,
                })
            );
        }
    }, [dispatch, category, filters, currentPage]);

    const handleFilterChange = newFilters => {
        dispatch(setFilters(newFilters));
    };

    const handlePageChange = page => {
        if (category) {
            dispatch(
                fetchRecipesByCategory({
                    categoryId: category.id || category.name,
                    page: page,
                    filters,
                })
            );
        }
    };

    const handleBack = () => {
        dispatch(clearSelectedCategory());
        if (onBack) {
            onBack();
        }
    };

    const categoryName = category?.name || 'DESSERTS';
    const categoryDescription =
        'Go on a taste journey, where every sip is a sophisticated creative chord, and every dessert is an expression of the most refined gastronomic desires.';

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
                            stroke-width="1.3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M7.99902 12.7141L3.28549 7.99956L8.00004 3.28602"
                            stroke="#050505"
                            stroke-width="1.3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
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
                    <RecipeList
                        recipes={recipes.length > 0 ? recipes : mockRecipes}
                        isLoading={recipesLoading}
                    />

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
