import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../features/modal/modalSlice';
import styles from './RecipeCard.module.css';

const RecipeCard = ({ recipe }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuth } = useSelector(state => state.auth);

    const handleAuthorClick = () => {
        if (isAuth) {
            navigate(`/user/${recipe.author.id}`);
        } else {
            dispatch(openModal({ type: 'login' }));
        }
    };

    const handleFavoriteClick = () => {
        if (isAuth) {
            // TODO: Додати/видалити з улюблених
            console.log('Toggle favorite for recipe:', recipe.id);
        } else {
            dispatch(openModal({ type: 'login' }));
        }
    };

    const handleViewRecipe = () => {
        navigate(`/recipe/${recipe.id}`);
    };

    return (
        <div className={styles.recipeCard}>
            <div className={styles.imageContainer}>
                <img
                    src={recipe.image || '/src/assets/images/desserts.jpg'}
                    alt={recipe.title}
                    className={styles.recipeImage}
                />
                <div className={styles.actions}>
                    <button
                        className={`${styles.favoriteButton} ${recipe.isFavorite ? styles.active : ''}`}
                        onClick={handleFavoriteClick}
                        title={recipe.isFavorite ? "Remove from favorites" : "Add to favorites"}
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
                        title={`View ${recipe.author.name}'s profile`}
                    >
                        <img
                            src={recipe.author.avatar || '/src/assets/images/desserts.jpg'}
                            alt={recipe.author.name}
                            className={styles.authorAvatar}
                        />
                        <span className={styles.authorName}>{recipe.author.name}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard; 