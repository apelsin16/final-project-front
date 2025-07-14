import { useState, useEffect } from 'react';
import MainTitle from '../common/ui/MainTitle/MainTitle';
import Subtitle from '../common/ui/Subtitle/Subtitle';
import Button from '../common/ui/Button/Button';
import RecipeFilters from '../RecipeFilters/RecipeFilters';
import RecipeList from '../RecipeList/RecipeList';
import RecipePagination from '../RecipePagination/RecipePagination';
import styles from './Recipes.module.css';

const Recipes = ({ category, onBack }) => {
    const [recipes, setRecipes] = useState([]);
    const [filters, setFilters] = useState({
        ingredient: '',
        area: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Мок дані для рецептів
    const mockRecipes = [
        {
            id: 1,
            title: "Beef Stroganoff",
            description: "A classic Russian dish with tender beef strips in a rich and creamy sauce, served over egg noodles.",
            image: "/src/assets/images/beef.jpg",
            author: {
                id: 1,
                name: "Chef Maria",
                avatar: "/src/assets/images/beef.jpg"
            },
            isFavorite: false
        },
        {
            id: 2,
            title: "Chocolate Cake",
            description: "Moist and decadent chocolate cake with rich chocolate frosting. Perfect for any celebration.",
            image: "/src/assets/images/desserts.jpg",
            author: {
                id: 2,
                name: "Baker John",
                avatar: "/src/assets/images/desserts.jpg"
            },
            isFavorite: true
        },
        {
            id: 3,
            title: "Breakfast Pancakes",
            description: "Fluffy and delicious pancakes perfect for a weekend breakfast. Serve with maple syrup and butter.",
            image: "/src/assets/images/breackfast.jpg",
            author: {
                id: 3,
                name: "Chef Sarah",
                avatar: "/src/assets/images/breackfast.jpg"
            },
            isFavorite: false
        },
        {
            id: 4,
            title: "Grilled Chicken",
            description: "Juicy grilled chicken breast marinated in herbs and spices. A healthy and delicious meal.",
            image: "/src/assets/images/beef.jpg",
            author: {
                id: 4,
                name: "Chef Alex",
                avatar: "/src/assets/images/beef.jpg"
            },
            isFavorite: false
        },
        {
            id: 5,
            title: "Vegetable Stir Fry",
            description: "Fresh vegetables cooked in a savory sauce. Quick, healthy, and packed with flavor.",
            image: "/src/assets/images/vegetarian.jpg",
            author: {
                id: 5,
                name: "Chef Emma",
                avatar: "/src/assets/images/vegetarian.jpg"
            },
            isFavorite: true
        },
        {
            id: 6,
            title: "Seafood Pasta",
            description: "Delicious pasta with fresh seafood in a light garlic and white wine sauce.",
            image: "/src/assets/images/seafood.jpg",
            author: {
                id: 6,
                name: "Chef Marco",
                avatar: "/src/assets/images/seafood.jpg"
            },
            isFavorite: false
        }
    ];

    // Скидаємо сторінку при зміні фільтрів
    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    // Завантажуємо рецепти при зміні категорії, фільтрів або сторінки
    useEffect(() => {
        if (category) {
            fetchRecipes();
        }
    }, [category, filters, currentPage]);

    const fetchRecipes = async () => {
        setIsLoading(true);
        try {
            // TODO: Замінити на реальний API запит
            // Симуляція завантаження
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Фільтруємо мок дані
            let filteredRecipes = mockRecipes;
            
            // Імітуємо пагінацію
            const recipesPerPage = 6;
            const startIndex = (currentPage - 1) * recipesPerPage;
            const endIndex = startIndex + recipesPerPage;
            const paginatedRecipes = filteredRecipes.slice(startIndex, endIndex);
            
            setRecipes(paginatedRecipes);
            setTotalPages(Math.ceil(filteredRecipes.length / recipesPerPage));
        } catch (error) {
            console.error('Error fetching recipes:', error);
            // TODO: Показати notification з помилкою
        } finally {
            setIsLoading(false);
        }
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <section className={styles.recipes}>
            <div className={styles.recipesHeader}>
                <Button variant="primary" size="small" onClick={onBack}>
                    ← Back
                </Button>
                <div className={styles.recipesTitle}>
                    <MainTitle color="dark" as="h2">
                        {category?.name || 'Recipes'}
                    </MainTitle>
                    <Subtitle color="dark" align="center" as="p">
                        Discover amazing recipes from {category?.name?.toLowerCase()} category
                    </Subtitle>
                </div>
            </div>
            
            <RecipeFilters 
                filters={filters} 
                onFiltersChange={handleFilterChange}
            />
            
            <RecipeList 
                recipes={recipes} 
                isLoading={isLoading}
            />
            
            <RecipePagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </section>
    );
};

export default Recipes; 