import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserInfo from '../UserInfo/UserInfo';
import TabsList from '../TabsList/TabsList';
import Button from '../common/ui/Button/Button.jsx';
import { followUser, unfollowUser, fetchFollowers } from '../../redux/profile/profileSlice.js';
import css from './UserCard.module.css';

const UserProfile = ({
    profileUser,
    isOwnProfile,
    followersCount,
    followingCount,
    recipesCount,
    favoritesCount,
    activeTab,
    setActiveTab,
    renderTabContent,
    openModal,
}) => {
    const dispatch = useDispatch();
    const { following } = useSelector(state => state.user);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (profileUser && following && !isOwnProfile) {
            const userId = profileUser._id || profileUser.id;

            const alreadyFollowing =
                Array.isArray(following) &&
                following.some(followedUser => {
                    const followedId = followedUser._id || followedUser.id;
                    return followedId === userId;
                });

            setIsFollowing(alreadyFollowing);
        }
    }, [following, profileUser, isOwnProfile]);

    const handleFollowToggle = () => {
        if (!profileUser || isProcessing) return;

        setErrorMessage('');
        const userId = profileUser._id || profileUser.id;
        setIsProcessing(true);

        if (isFollowing) {
            setIsFollowing(false);

            dispatch(unfollowUser(userId))
                .unwrap()
                .then(() => {
                    setIsFollowing(false);
                    dispatch(fetchFollowers(userId));
                })
                .catch(error => {
                    console.error('Failed to unfollow:', error);
                    setIsFollowing(true);
                    setErrorMessage('Не вдалося відписатися. Спробуйте ще раз.');
                })
                .finally(() => {
                    setIsProcessing(false);
                });
        } else {
            setIsFollowing(true);

            dispatch(followUser(userId))
                .unwrap()
                .then(() => {
                    setIsFollowing(true);
                    dispatch(fetchFollowers(userId));
                })
                .catch(error => {
                    console.error('Failed to follow:', error);
                    setIsFollowing(false);
                    setErrorMessage('Не вдалося підписатися. Спробуйте ще раз.');
                })
                .finally(() => {
                    setIsProcessing(false);
                });
        }
    };

    const handleMouseEnter = () => {
        if (isFollowing) {
            setIsHovering(true);
        }
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    return (
        <div className={css.wrapper}>
            <div className={css.userCardWrapper}>
                {profileUser ? (
                    <UserInfo
                        user={profileUser}
                        isOwnProfile={isOwnProfile}
                        followersCount={followersCount}
                        followingCount={followingCount}
                        recipesCount={recipesCount}
                        favoritesCount={favoritesCount}
                    />
                ) : (
                    <div>No user data available.</div>
                )}

                {errorMessage && (
                    <div className={css.errorMessage} role="alert" aria-live="assertive">
                        {errorMessage}
                    </div>
                )}

                {isOwnProfile ? (
                    <Button className={css.button} onClick={() => openModal('logout')}>
                        Log Out
                    </Button>
                ) : (
                    profileUser && (
                        <Button
                            onClick={handleFollowToggle}
                            variant={isFollowing ? 'following' : 'follow'}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            className={isFollowing && isHovering ? css.unfollowHover : ''}
                            style={{ cursor: isProcessing ? 'wait' : 'pointer' }}
                            disabled={isProcessing}
                            aria-pressed={isFollowing}
                            aria-label={isFollowing ? 'Відписатися' : 'Підписатися'}
                        >
                            {isProcessing
                                ? 'Processing...'
                                : isFollowing
                                ? isHovering
                                    ? 'Unfollow'
                                    : 'FOLLOWING'
                                : 'FOLLOW'}
                        </Button>
                    )
                )}
            </div>

            <div className={css.tabsContentWrapper}>
                <TabsList
                    isOwnProfile={isOwnProfile}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                <div className={css.tabContentContainer}>{renderTabContent()}</div>
            </div>
        </div>
    );
};

export default React.memo(UserProfile);
