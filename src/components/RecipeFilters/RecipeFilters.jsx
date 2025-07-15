import Select from '../common/ui/Select/Select';
import styles from './RecipeFilters.module.css';

const RecipeFilters = ({ filters, onFiltersChange, ingredients = [], areas = [] }) => {
    // Мок дані для інгредієнтів (fallback)
    const mockIngredients = [
        { value: 'chicken', label: 'Chicken' },
        { value: 'beef', label: 'Beef' },
        { value: 'pork', label: 'Pork' },
        { value: 'fish', label: 'Fish' },
        { value: 'vegetables', label: 'Vegetables' },
        { value: 'cheese', label: 'Cheese' },
        { value: 'pasta', label: 'Pasta' },
        { value: 'rice', label: 'Rice' }
    ];

    // Мок дані для регіонів (fallback)
    const mockAreas = [
        { value: 'italian', label: 'Italian' },
        { value: 'chinese', label: 'Chinese' },
        { value: 'mexican', label: 'Mexican' },
        { value: 'indian', label: 'Indian' },
        { value: 'french', label: 'French' },
        { value: 'thai', label: 'Thai' },
        { value: 'japanese', label: 'Japanese' },
        { value: 'greek', label: 'Greek' }
    ];

    // Підготовка даних для select'ів
    const ingredientsOptions = ingredients.length > 0 
        ? ingredients.map(ingredient => ({
            value: ingredient.id || ingredient.value,
            label: ingredient.name || ingredient.label
        }))
        : mockIngredients;

    const areasOptions = areas.length > 0 
        ? areas.map(area => ({
            value: area.id || area.value,
            label: area.name || area.label
        }))
        : mockAreas;

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
                options={ingredientsOptions}
                value={filters.ingredient}
                onChange={handleIngredientChange}
                placeholder="Ingredients"
                size="large"
                className={styles.filterSelect}
            />
            <Select
                options={areasOptions}
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