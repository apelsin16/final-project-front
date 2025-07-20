import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from '../../features/modal/modalSlice';

import {
  addFavoriteRecipe,
  removeFavoriteRecipe,
} from '../../redux/profile/profileOperations';
import styles from './RecipePreparation.module.css';

const RecipePreparation = ({ preparation, recipeId }) => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  const favorites = useSelector((state) => state.profile.favorites);
  const isFavorite = favorites.some(recipe => recipe.id === recipeId);

  const handleToggleFavorite = () => {
    if (!isAuth) {
      dispatch(openModal({ type: 'login' }));
      return;
    }

    if (isFavorite) {
      dispatch(removeFavoriteRecipe(recipeId));
    } else {
      dispatch(addFavoriteRecipe(recipeId));
    }
  };

  const steps = preparation.split(/\n|\r|(?=\d+\.)/g).filter(Boolean);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Recipe Preparation</h3>
      <div className={styles.text}>
        {steps.length > 1 ? (
          <ol>
            {steps.map((step, idx) => (
              <li key={idx}>{step.replace(/^\d+\.\s*/, '')}</li>
            ))}
          </ol>
        ) : (
          <p>{preparation}</p>
        )}
      </div>

      <button className={styles.button} onClick={handleToggleFavorite}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default RecipePreparation;
