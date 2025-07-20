import { Link } from 'react-router-dom';

import { Button, IconButton } from '../common/ui';
import { useWindowWidth } from '../hooks/useWindowWidth';

import css from './FollowItem.module.css';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000/api';

export const FollowItem = ({
    avatar,
    name,
    quantity,
    id,
    recipes,
    isFollowing,
    onUnfollow,
    onFollow,
    isLoading,
}) => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  const avatarUrl =
    avatar && typeof avatar === 'string' && avatar.startsWith('//www.gravatar')
      ? avatar
      : avatar && typeof avatar === 'string'
      ? `${baseUrl}/${avatar}`
      : `${baseUrl}/default-avatar.png`;

    const width = useWindowWidth();
    const imagesToShow = width >= 1440 ? 4 : 3;

    const handleClick = () => {
        if (isLoading) return;
        if (isFollowing) {
            onUnfollow(id);
        } else {
            onFollow(id);
        }
    };

    return (
        <>
            <div className={css['follow-content-wrapper']}>
                <div className={css['follow-image-wrapper']}>
                    <img src={avatarUrl} alt={`${name || 'Unknown User'}'s avatar`} />
                </div>
                <div className={css['follow-description']}>
                    <h2 className={css['follow-title']}>{name || 'Unknown User'}</h2>
                    <p className={css['follow-quantity-recipes']}>Own recipes: {quantity ?? 0}</p>
                    <Button
                        className={css['follow-button']}
                        variant="primary"
                        size="small"
                        onClick={handleClick}
                        disabled={isLoading}
                        aria-label={isFollowing ? `Unfollow ${name}` : `Follow ${name}`}
                    >
                        {isLoading ? 'Loading...' : isFollowing ? 'Following' : 'Follow'}
                    </Button>
                </div>
            </div>
            <ul className={css['follow-images-list']}>
                {recipes?.length > 0 ? (
                    recipes.slice(0, imagesToShow).map(({ thumb, id: recipeId, title }) => (
                        <li key={recipeId} className={css['follow-images-item']}>
                            <img src={thumb} alt={title || 'Recipe image'} />
                        </li>
                    ))
                ) : (
                    <li className={css['no-recipes']}>No recipes available</li>
                )}
            </ul>
            <div>
                <Link to={`/user/${id}`}>
                    <IconButton
                        icon="arrow"
                        ariaLabel={`View ${name || 'Unknown User'}'s profile`}
                        className={css['recipe-button']}
                    />
                </Link>
            </div>
        </>
    );
};
