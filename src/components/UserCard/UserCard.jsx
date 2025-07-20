import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import UserAvatar from '../common/ui/UserAvatar/UserAvatar';
import { followUser, unfollowUser, fetchFollowers } from '../../redux/users/userSlice';
import css from './UserCard.module.css';

const UserCard = ({ user, activeTab }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Масив користувачів, за якими слідкує авторизований користувач
    const currentUserFollowing = useSelector(state => state.user.following || []);

    const [isFollowing, setIsFollowing] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    const userId = user._id || user.id;

    useEffect(() => {
        const alreadyFollowing = currentUserFollowing.some(u => (u._id || u.id) === userId);
        setIsFollowing(alreadyFollowing);
    }, [currentUserFollowing, userId]);

    const handleFollowToggle = async () => {
        if (isProcessing) return;
        setIsProcessing(true);

        try {
            if (isFollowing) {
                await dispatch(unfollowUser(userId)).unwrap();

                dispatch(fetchFollowers());

                setIsFollowing(false);

                if (activeTab === 'following') {
                    setIsVisible(false);
                }
            } else {
                await dispatch(followUser(userId)).unwrap();

                // Оновити список підписок
                dispatch(fetchFollowers());

                setIsFollowing(true);
            }
        } catch (error) {
            console.error('Follow toggle error:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    if (!isVisible) return null; // не відмалювати картку, якщо схована

    return (
        <div className={css.userCard}>
            <div
                className={css.userInfo}
                onClick={() => navigate(`/users/${userId}`)}
                role="button"
                tabIndex={0}
            >
                <UserAvatar src={user.avatar} showUpload={false} className={css.avatar} />
                <div className={css.infoText}>
                    <p className={css.name}>{user.name}</p>
                    <p className={css.recipesCount}>{user.recipesCount || 0} recipes</p>
                </div>
            </div>
            <button
                type="button"
                className={clsx(css.followButton, isFollowing ? css.following : css.follow)}
                onClick={handleFollowToggle}
                disabled={isProcessing}
            >
                {isProcessing ? 'Processing...' : isFollowing ? 'Following' : 'Follow'}
            </button>
        </div>
    );
};

export default UserCard;
