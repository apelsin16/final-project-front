import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './CategoryList.module.css';
import CategoryListItem from './CategoryListItem';
import {
    fetchCategories,
    fetchRecipesByCategory,
    setSelectedCategory,
} from '../../features/categories/categoriesSlice.js';

// Імпорт зображень категорій відповідно до Figma дизайну
import beefImg from '../../assets/images/beef.jpg';
import breakfastImg from '../../assets/images/breackfast.jpg';
import dessertsImg from '../../assets/images/desserts.jpg';
import lambImg from '../../assets/images/lamb.jpg';
import goatImg from '../../assets/images/goat.jpg';
import miscellaneousImg from '../../assets/images/miscellaneous.jpg';
import pastaImg from '../../assets/images/pasta.jpg';
import porkImg from '../../assets/images/pork.jpg';
import seafoodImg from '../../assets/images/seafood.jpg';
import sideImg from '../../assets/images/side.jpg';
import starterImg from '../../assets/images/starter.jpg';
import veganImg from '../../assets/images/vegan.jpg';
import vegetarianImg from '../../assets/images/vegetarian.jpg';

// Мапінг категорій з API на локальні зображення
const categoryImageMap = {
    Beef: beefImg,
    Breakfast: breakfastImg,
    Dessert: dessertsImg,
    Lamb: lambImg,
    Goat: goatImg,
    Miscellaneous: miscellaneousImg,
    Pasta: pastaImg,
    Pork: porkImg,
    Seafood: seafoodImg,
    Side: sideImg,
    Starter: starterImg,
    Vegan: veganImg,
    Vegetarian: vegetarianImg,
    Chicken: beefImg, // fallback для нових категорій
    Soup: miscellaneousImg, // fallback для нових категорій
};

const largeCategoryIndexTablet = [2, 7];

// Функція для мапінгу категорій з API
const mapApiCategoriesToDisplay = (apiCategories, screenType) => {
    return apiCategories.map(category => ({
        id: category.id,
        name: category.name,
        image: categoryImageMap[category.name],
    }));
};

const CategoryList = ({ onCategorySelect, onAllCategoriesClick }) => {
    const [screenType, setScreenType] = useState('mobile');
    const dispatch = useDispatch();
    const { categories, isLoading, error } = useSelector(state => state.categories);

    // Визначення типу екрана
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1440) {
                setScreenType('desktop');
            } else if (window.innerWidth >= 768) {
                setScreenType('tablet');
            } else {
                setScreenType('mobile');
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Завантаження категорій при монтуванні компонента
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    // Обробка вибору категорії
    const handleCategorySelect = async category => {
        try {
            dispatch(setSelectedCategory(category));

            // Запит на бекенд за рецептами обраної категорії
            const result = await dispatch(
                fetchRecipesByCategory({
                    categoryId: category.id,
                    categoryName: category.name,
                    page: 1,
                })
            ).unwrap();

            // Якщо запит успішний, викликаємо callback для переключення на Recipes
            if (onCategorySelect) {
                onCategorySelect(category);
            }
        } catch (error) {
            // Помилка буде оброблена в Redux slice і показана через iziToast
            console.error('Error fetching recipes:', error);
        }
    };

    const handleAllCategoriesClick = () => {
        if (onAllCategoriesClick) {
            onAllCategoriesClick();
        }
    };

    const AllCategoriesButton = () => (
        <div
            className={styles.allCategoriesButton}
            onClick={handleAllCategoriesClick}
            role="button"
            tabIndex={0}
            onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleAllCategoriesClick();
                }
            }}
            aria-label="View all recipe categories"
        >
            <span className={styles.allCategoriesText}>All categories</span>
        </div>
    );

    const getCategoriesToDisplay = () => {
        const mappedCategories = mapApiCategoriesToDisplay(categories, screenType);
        return mappedCategories.slice(0, screenType === 'mobile' ? 8 : 11);
    };

    const categoriesToDisplay = getCategoriesToDisplay();

    // Show loading
    if (isLoading) {
        return (
            <div className={styles.categoryList}>
                <div className={styles.loading}>Loading categories...</div>
            </div>
        );
    }

    // Мобільна версія
    if (screenType === 'mobile') {
        return (
            <div className={styles.categoryList}>
                <div className={styles.mobileContent}>
                    {categoriesToDisplay.map(category => (
                        <CategoryListItem
                            key={category.id}
                            category={category}
                            onCategorySelect={handleCategorySelect}
                        />
                    ))}
                    <AllCategoriesButton />
                </div>
            </div>
        );
    }

    // Планшетна версія
    if (screenType === 'tablet') {
        return (
            <div className={styles.categoryList}>
                <div className={styles.tabletContent}>
                    <div className={styles.tabletGrid}>
                        {categoriesToDisplay.map((category, index) => (
                            <CategoryListItem
                                key={category.id}
                                category={category}
                                large={largeCategoryIndexTablet.includes(index)}
                                onCategorySelect={handleCategorySelect}
                            />
                        ))}
                        <AllCategoriesButton />
                    </div>
                </div>
            </div>
        );
    }

    // Десктопна версія
    return (
        <div className={styles.categoryList}>
            <div className={styles.desktopContent}>
                <div className={styles.row}>
                    <CategoryListItem
                        category={categoriesToDisplay[0]}
                        onCategorySelect={handleCategorySelect}
                    />
                    <CategoryListItem
                        category={categoriesToDisplay[1]}
                        onCategorySelect={handleCategorySelect}
                    />
                    <CategoryListItem
                        category={categoriesToDisplay[2]}
                        onCategorySelect={handleCategorySelect}
                        large={true}
                    />
                </div>
                <div className={styles.row}>
                    <CategoryListItem
                        category={categoriesToDisplay[3]}
                        onCategorySelect={handleCategorySelect}
                        large={true}
                    />
                    <CategoryListItem
                        category={categoriesToDisplay[4]}
                        onCategorySelect={handleCategorySelect}
                    />
                    <CategoryListItem
                        category={categoriesToDisplay[5]}
                        onCategorySelect={handleCategorySelect}
                    />
                </div>
                <div className={styles.row}>
                    <CategoryListItem
                        category={categoriesToDisplay[6]}
                        onCategorySelect={handleCategorySelect}
                    />
                    <CategoryListItem
                        category={categoriesToDisplay[7]}
                        onCategorySelect={handleCategorySelect}
                        large={true}
                    />
                    <CategoryListItem
                        category={categoriesToDisplay[8]}
                        onCategorySelect={handleCategorySelect}
                    />
                </div>
                <div className={styles.row}>
                    <CategoryListItem
                        category={categoriesToDisplay[9]}
                        onCategorySelect={handleCategorySelect}
                        large={true}
                    />
                    <CategoryListItem
                        category={categoriesToDisplay[10]}
                        onCategorySelect={handleCategorySelect}
                    />
                    <AllCategoriesButton />
                </div>
            </div>
        </div>
    );
};

export default CategoryList;
