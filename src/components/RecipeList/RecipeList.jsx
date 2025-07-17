import { useCallback } from 'react';

import { RecipeItem } from '../RecipeItem/RecipeItem';

import css from './RecipeList.module.css';

export const RecipeList = ({
  recipes,
  isFavorite = false,
  pagination,
  setCurrentPage,
  isCurrentUser,
}) => {
  const handlePageChange = useCallback(
    page => {
      if (page >= 1 && page <= (pagination?.totalPages || 1)) {
        setCurrentPage(page);
      } else {
        console.log('RecipeList: Invalid page, not setting:', page);
      }
    },
    [pagination?.totalPages, setCurrentPage]
  );

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
    <div>
      {!recipes || recipes.length === 0 ? (
        <p className={css['no-recipes']}>{getEmptyMessage()}</p>
      ) : (
        <ul className={css['recipes-list']}>
          {recipes.map(
            ({ thumb, title, instructions = 'No instructions', id }) => (
              <li className={css['recipe-item']} key={id}>
                <RecipeItem
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

      {pagination && pagination.totalRecipes > pagination.recipesPerPage && (
        <div className={css['pagination']}>
          {Array.from(
            { length: pagination.totalPages || 1 },
            (_, index) => index + 1
          ).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`${css['pagination-button']} ${
                pagination.currentPage === page ? css['active-page'] : ''
              }`}
              aria-current={
                pagination.currentPage === page ? 'page' : undefined
              }
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
