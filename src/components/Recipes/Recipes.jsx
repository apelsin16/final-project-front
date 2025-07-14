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
        ingredient: null,
        area: null
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // Мок дані для рецептів
    const mockRecipes = [
        {
            id: 1,
            title: "Bakewell tart",
            description: "To make the pastry, measure the flour into a bowl and rub in the butter with your fingertips until the mixture resembles fine breadcrumbs.",
            image: "/src/assets/images/desserts.jpg",
            author: {
                id: 1,
                name: "Ivetta",
                avatar: "/src/assets/images/desserts.jpg"
            },
            isFavorite: false
        },
        {
            id: 2,
            title: "Chinon Apple Tarts",
            description: "To make the red wine jelly, put the red wine, jam sugar, star anise, clove, cinnamon stick, allspice, split vanilla pod and seeds in a medium saucepan.",
            image: "/src/assets/images/desserts.jpg",
            author: {
                id: 2,
                name: "Nadia",
                avatar: "/src/assets/images/desserts.jpg"
            },
            isFavorite: true
        },
        {
            id: 3,
            title: "Sticky Toffee Pudding",
            description: "Preheat the oven to 180C/160C Fan/Gas 4. Butter a wide shallow 1.7-litre/3-pint ovenproof dish. Put the butter, sugar, eggs, flour, baking powder, bicarbonate of soda and treacle into a mixing bowl.",
            image: "/src/assets/images/desserts.jpg",
            author: {
                id: 3,
                name: "Mykhailo",
                avatar: "/src/assets/images/desserts.jpg"
            },
            isFavorite: false
        },
        {
            id: 4,
            title: "Carrot Cake",
            description: "For the carrot cake, preheat the oven to 160C/325F/Gas 3.",
            image: "/src/assets/images/desserts.jpg",
            author: {
                id: 4,
                name: "Vlad",
                avatar: "/src/assets/images/desserts.jpg"
            },
            isFavorite: false
        },
        {
            id: 5,
            title: "Eccles Cakes",
            description: "To make the pastry, dice the butter and put it in the freezer to go really hard.",
            image: "/src/assets/images/desserts.jpg",
            author: {
                id: 5,
                name: "Victoria",
                avatar: "/src/assets/images/desserts.jpg"
            },
            isFavorite: true
        },
        {
            id: 6,
            title: "Apam balik",
            description: "Mix milk, oil and egg together. Sift flour, baking powder and salt into the mixture.",
            image: "/src/assets/images/desserts.jpg",
            author: {
                id: 6,
                name: "Andrew",
                avatar: "/src/assets/images/desserts.jpg"
            },
            isFavorite: false
        },
        {
            id: 7,
            title: "Apple Frangipan Tart",
            description: "Preheat the oven to 200C/180C Fan/Gas 6. Put the biscuits in a large re-sealable freezer bag and bash with a rolling pin into fine crumbs.",
            image: "/src/assets/images/desserts.jpg",
            author: {
                id: 7,
                name: "Olena",
                avatar: "/src/assets/images/desserts.jpg"
            },
            isFavorite: false
        },
        {
            id: 8,
            title: "Treacle Tart",
            description: "Preheat the oven to 200C/180C Fan/Gas 6. Put the biscuits in a large re-sealable freezer bag and bash with a rolling pin into fine crumbs.",
            image: "/src/assets/images/desserts.jpg",
            author: {
                id: 8,
                name: "Victor",
                avatar: "/src/assets/images/desserts.jpg"
            },
            isFavorite: false
        },
        {
            id: 9,
            title: "Peanut Butter Cheeseca...",
            description: "Oil and line a 20cm round loose- bottomed cake tin with cling film, making it as smooth as possible.",
            image: "/src/assets/images/desserts.jpg",
            author: {
                id: 9,
                name: "Oleg",
                avatar: "/src/assets/images/desserts.jpg"
            },
            isFavorite: false
        },
        {
            id: 10,
            title: "Rocky Road Fudge",
            description: "Line an 8-inch-square baking pan with wax paper or foil, and coat with non-stick spray.",
            image: "/src/assets/images/desserts.jpg",
            author: {
                id: 10,
                name: "Ilona",
                avatar: "/src/assets/images/desserts.jpg"
            },
            isFavorite: false
        },
        {
            id: 11,
            title: "Cashew Ghoriba Biscuits",
            description: "Preheat the oven at 180 C / Gas 4. Line a baking tray with greaseproof paper.",
            image: "/src/assets/images/desserts.jpg",
            author: {
                id: 11,
                name: "Dmytro",
                avatar: "/src/assets/images/desserts.jpg"
            },
            isFavorite: false
        },
        {
            id: 12,
            title: "Krispy Kreme Donut",
            description: "Dissolve yeast in warm water in 2 1/2-quart bowl.",
            image: "/src/assets/images/desserts.jpg",
            author: {
                id: 12,
                name: "Julia",
                avatar: "/src/assets/images/desserts.jpg"
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
            const recipesPerPage = 12;
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

    const categoryName = category?.name || 'DESSERTS';
    const categoryDescription = "Go on a taste journey, where every sip is a sophisticated creative chord, and every dessert is an expression of the most refined gastronomic desires.";

    return (
        <section className={styles.recipes}>
            <div className={styles.recipesHeader}>
                <button className={styles.backButton} onClick={onBack}>
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
                
                <h1 className={styles.categoryTitle}>{categoryName}</h1>
                <p className={styles.categoryDescription}>{categoryDescription}</p>
            </div>
            
            <div className={styles.recipesContent}>
                <RecipeFilters 
                    filters={filters} 
                    onFiltersChange={handleFilterChange}
                />
                
                <div className={styles.recipesMain}>
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

export default Recipes; 