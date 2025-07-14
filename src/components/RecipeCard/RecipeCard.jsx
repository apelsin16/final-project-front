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
                        title="Add to favorites"
                    >
                        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                            <path 
                                d="M15.68 13.67L1.16 2.25" 
                                stroke="currentColor" 
                                strokeWidth="1.5" 
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                    <button
                        className={styles.viewButton}
                        onClick={handleViewRecipe}
                        title="View recipe"
                    >
                        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                            <circle 
                                cx="9" 
                                cy="9" 
                                r="3.75" 
                                stroke="currentColor" 
                                strokeWidth="1.5"
                            />
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
                    >
                        <img
                            src={recipe.author.avatar || '/src/assets/images/desserts.jpg'}
                            alt={recipe.author.name}
                            className={styles.authorAvatar}
                        />
                        <span className={styles.authorName}>{recipe.author.name}</span>
                    </button>
                    
                    <div className={styles.cardActions}>
                        <button
                            className={`${styles.actionButton} ${recipe.isFavorite ? styles.active : ''}`}
                            onClick={handleFavoriteClick}
                            title="Add to favorites"
                        >
                            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                                <path 
                                    d="M15.68 13.67L1.16 2.25" 
                                    stroke="currentColor" 
                                    strokeWidth="1.5" 
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                        <button
                            className={styles.actionButton}
                            onClick={handleViewRecipe}
                            title="View recipe"
                        >
                            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                                <circle 
                                    cx="9" 
                                    cy="9" 
                                    r="3.75" 
                                    stroke="currentColor" 
                                    strokeWidth="1.5"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard; 