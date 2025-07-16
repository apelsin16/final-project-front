import Select from '../common/ui/Select/Select';
import styles from './RecipeFilters.module.css';

const RecipeFilters = ({ filters, onFiltersChange, areas = [], ingredients = [], className }) => {
    // Мок дані для регіонів (fallback)
    const mockAreas = [
        { value: 'italian', label: 'Italian' },
        { value: 'chinese', label: 'Chinese' },
        { value: 'mexican', label: 'Mexican' },
        { value: 'indian', label: 'Indian' },
        { value: 'french', label: 'French' },
        { value: 'thai', label: 'Thai' },
        { value: 'japanese', label: 'Japanese' },
        { value: 'greek', label: 'Greek' },
    ];

    // Мок дані для інгредієнтів (fallback)
    const mockIngredients = [
        { value: 'tomato', label: 'Tomato' },
        { value: 'onion', label: 'Onion' },
        { value: 'garlic', label: 'Garlic' },
        { value: 'chicken', label: 'Chicken' },
        { value: 'beef', label: 'Beef' },
        { value: 'rice', label: 'Rice' },
        { value: 'cheese', label: 'Cheese' },
        { value: 'pepper', label: 'Pepper' },
    ];

    // Підготовка даних для select'а areas
    const areasOptions =
        areas.length > 0
            ? areas.map(area => ({
                  value: area.id || area.value,
                  label: area.name || area.label,
              }))
            : mockAreas;

    // Підготовка даних для select'а ingredients
    const ingredientsOptions =
        ingredients.length > 0
            ? ingredients.map(ingredient => ({
                  value: ingredient.id || ingredient.value,
                  label: ingredient.name || ingredient.label,
              }))
            : mockIngredients;

    const handleAreaChange = value => {
        onFiltersChange({
            ...filters,
            area: value,
        });
    };

    const handleIngredientChange = value => {
        onFiltersChange({
            ...filters,
            ingredient: value,
        });
    };

    return (
        <div className={`${styles.recipeFilters} ${className}`}>
            <Select
                options={ingredientsOptions}
                value={filters.ingredient}
                onChange={handleIngredientChange}
                placeholder="Ingredient"
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
