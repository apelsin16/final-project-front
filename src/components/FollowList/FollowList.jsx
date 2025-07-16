import { useDispatch, useSelector } from 'react-redux';
import { useState, useCallback } from 'react';
import iziToast from 'izitoast';

import { FollowItem } from '../FollowItem/FollowItem';
import { selectUserFollowing } from '../../redux/profile/profileSelectors';
import {
  followUser,
  unfollowUser,
} from '../../redux/profile/profileOperations';

import css from './FollowList.module.css';

export const FollowList = ({
  connectionList,
  isCheckFollowing = false,
  pagination,
  setCurrentPage,
  isCurrentUser = false,
}) => {
  const dispatch = useDispatch();
  const following = useSelector(selectUserFollowing);

  const [pendingFollowing, setPendingFollowing] = useState(new Set());
  const [loadingUsers, setLoadingUsers] = useState({});

  const changeFollowStatus = useCallback(
    async (userId, follow) => {
      setLoadingUsers(prev => ({ ...prev, [userId]: true }));

      setPendingFollowing(prev => {
        const newSet = new Set(prev);
        if (follow) newSet.add(userId);
        else newSet.delete(userId);
        return newSet;
      });

      try {
        if (follow) {
          await dispatch(followUser(userId)).unwrap();
          iziToast.success({
            title: 'Success',
            message: 'You are now following this user.',
            position: 'topRight',
          });
        } else {
          await dispatch(unfollowUser(userId)).unwrap();
          iziToast.info({
            title: 'Unfollowed',
            message: 'You have unfollowed this user.',
            position: 'topRight',
          });
        }
      } catch {
        iziToast.error({
          title: 'Error',
          message: `Failed to ${follow ? 'follow' : 'unfollow'} user.`,
          position: 'topRight',
        });

        setPendingFollowing(prev => {
          const newSet = new Set(prev);
          if (follow) newSet.delete(userId);
          else newSet.add(userId);
          return newSet;
        });
      } finally {
        setLoadingUsers(prev => ({ ...prev, [userId]: false }));
      }
    },
    [dispatch]
  );

  const onFollow = useCallback(
    userId => changeFollowStatus(userId, true),
    [changeFollowStatus]
  );
  const onUnfollow = useCallback(
    userId => changeFollowStatus(userId, false),
    [changeFollowStatus]
  );

  const handlePageChange = useCallback(
    page => {
      if (pagination && page >= 1 && page <= pagination.totalPages) {
        setCurrentPage(page);
      }
    },
    [pagination, setCurrentPage]
  );

  const showPagination =
    pagination &&
    (pagination.totalFollowers > 9 || pagination.totalFollowing > 9);

  const renderEmptyMessage = () => {
    if (!isCurrentUser) {
      return `This user has no ${
        isCheckFollowing ? 'subscriptions' : 'followers'
      } yet.`;
    }

    if (isCheckFollowing) {
      return 'Your account currently has no subscriptions to other users. Learn more about our users and select those whose content interests you.';
    }

    return 'There are currently no followers on your account. Please engage our visitors with interesting content and draw their attention to your profile.';
  };

  return (
    <div>
      {!connectionList || connectionList.length === 0 ? (
        <p className={css['no-followers']}>{renderEmptyMessage()}</p>
      ) : (
        <ul className={css['follow-list']}>
          {connectionList.map(
            ({ id, name, avatarURL, recipes, totalRecipes }) => {
              const isFollowing =
                isCheckFollowing ||
                following.some(user => user.id === id) ||
                pendingFollowing.has(id);

              return (
                <li className={css['follow-item']} key={id}>
                  <FollowItem
                    name={name}
                    avatar={avatarURL}
                    recipes={recipes}
                    quantity={totalRecipes}
                    id={id}
                    isFollowing={isFollowing}
                    onUnfollow={onUnfollow}
                    onFollow={onFollow}
                    isLoading={loadingUsers[id] || false}
                  />
                </li>
              );
            }
          )}
        </ul>
      )}

      {showPagination && (
        <div className={css['pagination']}>
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
            page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`${css['pagination-button']} ${
                  pagination.currentPage === page ? css['active-page'] : ''
                }`}
                aria-current={
                  pagination.currentPage === page ? 'page' : undefined
                }
                aria-label={`Go to page ${page}`}
              >
                {page}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};
