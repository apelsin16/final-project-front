import RecipeCard from '../RecipeCard/RecipeCard';
import styles from './RecipeList.module.css';

const RecipeList = ({ recipes, isLoading }) => {
    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingMessage}>Loading recipes...</div>
            </div>
        );
    }

    if (!recipes || recipes.length === 0) {
        return (
            <div className={styles.emptyContainer}>
                <div className={styles.emptyMessage}>No recipes found</div>
                <p className={styles.emptySubtext}>Try adjusting your filters or search criteria</p>
            </div>
        );
    }

    return (
        <div className={styles.recipeList}>
            {recipes.map((recipe) => (
                <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                />
            ))}
        </div>
    );
};

export default RecipeList;
