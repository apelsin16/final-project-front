import { useState } from 'react';
import { Link } from 'react-router-dom'; // виправлено імпорт
import { useDispatch, useSelector } from 'react-redux';

import {
  deleteRecipe,
  removeFavoriteRecipe,
} from '../../redux/profile/profileOperations';
import { IconButton } from '../common/ui';

import css from './RecipeItem.module.css';

export const RecipeItem = ({
  image,
  title,
  instructions,
  id,
  isFavorite,
  isCurrentUser,
}) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async id => {
    if (isRemoving) return;
    setIsRemoving(true);
    try {
      if (isFavorite) {
        await dispatch(removeFavoriteRecipe(id)).unwrap();
      } else {
        await dispatch(deleteRecipe(id)).unwrap();
      }
    } catch (error) {
      console.error('Failed to remove recipe:', error);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <>
      <div className={css['recipe-left-block']}>
        <div className={css['recipe-image-wrapper']}>
          <img src={image} alt={title} />
        </div>
        <div className={css['recipe-content']}>
          <h2 className={css['recipe-title']}>{title}</h2>
          <p className={css['recipe-text']}>{instructions}</p>
        </div>
      </div>
      <div className={css['recipe-right-block']}>
        <Link to={`/recipe/${id}`}>
          <IconButton
            icon="arrow"
            ariaLabel="Open recipe"
            className={css['recipe-button']}
          />
        </Link>
        {isCurrentUser && isAuth && (
          <IconButton
            icon="delete"
            ariaLabel="Delete recipe"
            className={css['recipe-delete-button']}
            onClick={() => handleRemove(id)}
            disabled={isRemoving}
          />
        )}
      </div>
    </>
  );
};
