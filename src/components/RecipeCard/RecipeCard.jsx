import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../features/modal/modalSlice';
import { toggleFavorite } from '../../features/recipes/recipesSlice';
import IconButton from '../common/ui/IconButton/IconButton';
import styles from './RecipeCard.module.css';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api';

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

    console.log(recipe);

    // Get owner info with fallback values
    const ownerName = recipe.owner?.name || 'Unknown User';
    const ownerAvatar = recipe.owner?.avatarURL || '/desserts.jpg';

    // Check if recipe is in favorites
    const isFavorite = favoriteIds.includes(recipe.id) || API + recipe.isFavorite;

    return (
        <div className={styles.recipeCard}>
            <div className={styles.imageContainer}>
                <img
                    src={recipe.thumb || API + recipe.image || '/desserts.jpg'}
                    alt={recipe.title}
                    className={styles.recipeImage}
                />
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
                        <img src={ownerAvatar} alt={ownerName} className={styles.authorAvatar} />
                        <span className={styles.authorName}>{ownerName}</span>
                    </button>
                    <div className={styles.actions}>
                        <IconButton
                            icon="heart"
                            size="small"
                            variant={isFavorite ? 'filled' : 'default'}
                            color="white"
                            onClick={handleFavoriteClick}
                        />
                        <IconButton
                            onClick={handleViewRecipe}
                            icon="arrow"
                            size="small"
                            variant="default"
                            color="white"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
