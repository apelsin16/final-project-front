import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../features/modal/modalSlice';
import { toggleFavorite } from '../../features/recipes/recipesSlice';
import styles from './RecipeCard.module.css';

const RecipeCard = ({ recipe }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuth } = useSelector(state => state.auth);
    const { favoriteIds, favoritesLoading } = useSelector(state => state.recipes);

    const handleAuthorClick = () => {
        if (isAuth) {
            // Use owner.id if available, otherwise use ownerId
            const userId = recipe.owner?.id || recipe.ownerId;
            navigate(`/user/${userId}`);
        } else {
            dispatch(openModal({ type: 'login' }));
        }
    };

    const handleFavoriteClick = () => {
        if (isAuth) {
            dispatch(toggleFavorite(recipe.id));
        } else {
            dispatch(openModal({ type: 'login' }));
        }
    };

    const handleViewRecipe = () => {
        navigate(`/recipe/${recipe.id}`);
    };

    // Get owner info with fallback values
    const ownerName = recipe.owner?.name || 'Unknown User';
    const ownerAvatar = recipe.owner?.avatarURL || '/src/assets/images/desserts.jpg';
    
    // Check if recipe is in favorites
    const isFavorite = favoriteIds.includes(recipe.id) || recipe.isFavorite;

    return (
        <div className={styles.recipeCard}>
            <div className={styles.imageContainer}>
                <img
                    src={recipe.thumb || recipe.image || '/src/assets/images/desserts.jpg'}
                    alt={recipe.title}
                    className={styles.recipeImage}
                />
                <div className={styles.actions}>
                    <button
                        className={`${styles.favoriteButton} ${isFavorite ? styles.active : ''}`}
                        onClick={handleFavoriteClick}
                        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                        disabled={favoritesLoading}
                    >
                        <svg width="16" height="16">
                            <use href="/src/assets/sprite.svg#heart" />
                        </svg>
                    </button>
                    <button
                        className={styles.viewButton}
                        onClick={handleViewRecipe}
                        title="View recipe"
                    >
                        <svg width="16" height="16">
                            <use href="/src/assets/sprite.svg#arrow" />
                        </svg>
                    </button>
                </div>
            </div>
            
            <div className={styles.content}>
                <div className={styles.textContent}>
                    <h3 className={styles.title}>{recipe.title}</h3>
                    <p className={styles.description}>{recipe.description}</p>
                </div>
                
                <div className={styles.footer}>
                    <button
                        className={styles.authorButton}
                        onClick={handleAuthorClick}
                        title={`View ${ownerName}'s profile`}
                    >
                        <img
                            src={ownerAvatar}
                            alt={ownerName}
                            className={styles.authorAvatar}
                        />
                        <span className={styles.authorName}>{ownerName}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard; 