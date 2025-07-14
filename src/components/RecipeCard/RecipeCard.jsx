import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openModal } from '../../features/modal/modalSlice';
import IconButton from '../common/ui/IconButton/IconButton';
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
                    src={recipe.image || '/src/assets/images/beef.jpg'}
                    alt={recipe.title}
                    className={styles.recipeImage}
                />
                <div className={styles.actions}>
                    <IconButton
                        icon="heart"
                        onClick={handleFavoriteClick}
                        className={`${styles.favoriteButton} ${recipe.isFavorite ? styles.active : ''}`}
                        title="Add to favorites"
                    />
                    <IconButton
                        icon="arrow-right"
                        onClick={handleViewRecipe}
                        className={styles.viewButton}
                        title="View recipe"
                    />
                </div>
            </div>
            
            <div className={styles.content}>
                <h3 className={styles.title}>{recipe.title}</h3>
                <p className={styles.description}>{recipe.description}</p>
                
                <button
                    className={styles.authorButton}
                    onClick={handleAuthorClick}
                >
                    <img
                        src={recipe.author.avatar || '/src/assets/images/beef.jpg'}
                        alt={recipe.author.name}
                        className={styles.authorAvatar}
                    />
                    <span className={styles.authorName}>{recipe.author.name}</span>
                </button>
            </div>
        </div>
    );
};

export default RecipeCard; 