import { ListItem } from '../ListItem/ListItem';

import css from './ListItems.module.css';

export const ListItems = ({ recipes, isFavorite = false, isCurrentUser }) => {
  const getEmptyMessage = () => {
    if (isFavorite) {
      return isCurrentUser
        ? 'Nothing has been added to your favorite recipes list yet. Please browse our recipes and add your favorites for easy access in the future.'
        : 'This user has not added any favorite recipes yet.';
    }

    return isCurrentUser
      ? 'Nothing has been added to your recipes list yet. Please browse our recipes and add your favorites for easy access in the future.'
      : 'This user has not added any recipes yet.';
  };

  return (
    <>
      {!recipes || recipes.length === 0 ? (
        <p className={css['no-recipes']}>{getEmptyMessage()}</p>
      ) : (
        <ul className={css['recipes-list']}>
          {recipes.map(
            ({ thumb, title, instructions = 'No instructions', id }) => (
              <li className={css['recipe-item']} key={id}>
                <ListItem
                  image={thumb}
                  title={title}
                  instructions={instructions}
                  id={id}
                  isFavorite={isFavorite}
                  isCurrentUser={isCurrentUser}
                />
              </li>
            )
          )}
        </ul>
      )}
    </>
  );
};
