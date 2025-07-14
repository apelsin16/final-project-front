import { useState, useEffect } from 'react';
import Select from '../common/ui/Select/Select';
import styles from './RecipeFilters.module.css';

const RecipeFilters = ({ filters, onFiltersChange }) => {
    const [ingredients, setIngredients] = useState([]);
    const [areas, setAreas] = useState([]);

    // Мок дані для інгредієнтів
    const mockIngredients = [
        { value: '', label: 'All Ingredients' },
        { value: 'chicken', label: 'Chicken' },
        { value: 'beef', label: 'Beef' },
        { value: 'pork', label: 'Pork' },
        { value: 'fish', label: 'Fish' },
        { value: 'vegetables', label: 'Vegetables' },
        { value: 'cheese', label: 'Cheese' },
        { value: 'pasta', label: 'Pasta' },
        { value: 'rice', label: 'Rice' }
    ];

    // Мок дані для регіонів
    const mockAreas = [
        { value: '', label: 'All Areas' },
        { value: 'italian', label: 'Italian' },
        { value: 'chinese', label: 'Chinese' },
        { value: 'mexican', label: 'Mexican' },
        { value: 'indian', label: 'Indian' },
        { value: 'french', label: 'French' },
        { value: 'thai', label: 'Thai' },
        { value: 'japanese', label: 'Japanese' },
        { value: 'greek', label: 'Greek' }
    ];

    // Завантаження інгредієнтів та регіонів
    useEffect(() => {
        const fetchFiltersData = async () => {
            try {
                // TODO: Замінити на реальні API запити
                // const [ingredientsRes, areasRes] = await Promise.all([
                //     fetch('/api/ingredients'),
                //     fetch('/api/areas')
                // ]);
                // const ingredientsData = await ingredientsRes.json();
                // const areasData = await areasRes.json();
                // setIngredients(ingredientsData);
                // setAreas(areasData);
                
                // Поки що використовуємо мок дані
                setIngredients(mockIngredients);
                setAreas(mockAreas);
            } catch (error) {
                console.error('Error fetching filters data:', error);
                // TODO: Показати notification з помилкою
            }
        };

        fetchFiltersData();
    }, []);

    const handleIngredientChange = (value) => {
        onFiltersChange({
            ...filters,
            ingredient: value
        });
    };

    const handleAreaChange = (value) => {
        onFiltersChange({
            ...filters,
            area: value
        });
    };

    return (
        <div className={styles.recipeFilters}>
            <Select
                options={ingredients}
                value={filters.ingredient}
                onChange={handleIngredientChange}
                placeholder="Ingredients"
                size="large"
                className={styles.filterSelect}
            />
            <Select
                options={areas}
                value={filters.area}
                onChange={handleAreaChange}
                placeholder="Area"
                size="large"
                className={styles.filterSelect}
            />
        </div>
    );
};

export default RecipeFilters; 