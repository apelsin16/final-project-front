import css from './UserInfo.module.css';
import UserAvatar from '../common/ui/UserAvatar/UserAvatar';
import { useDispatch } from 'react-redux';
import { Button } from '../common/ui';
import { openModal } from '../../features/modal/modalSlice';
import { followUser } from '../../features/user/userSlice';

const UserInfo = ({
    user,
    isOwnProfile,
    followersCount,
    followingCount,
    recipesCount,
    favoritesCount,
}) => {
    const { name, email, avatarURL } = user || {};

    const dispatch = useDispatch();

    console.log('USER UserInfo', user);

    return (
        <div className={css.wrapper}>
            <div className={css.container}>
                <UserAvatar isOwnProfile={isOwnProfile} src={avatarURL} alt={`${name}'s avatar`} />
                <h2 className={css.username}>{name}</h2>

                <ul className={css.statsList}>
                    <li className={css.statsItem}>
                        <span className={css.label}>Email:</span>
                        <span className={css.value}>{email}</span>
                    </li>
                    <li className={css.statsItem}>
                        <span className={css.label}>Added recipes:</span>
                        <span className={css.value}>{recipesCount || 0}</span>
                    </li>

                    {isOwnProfile && (
                        <li className={css.statsItem}>
                            <span className={css.label}>Favorites:</span>
                            <span className={css.value}>{favoritesCount || 0}</span>
                        </li>
                    )}
                    <li className={css.statsItem}>
                        <span className={css.label}>Followers:</span>
                        <span className={css.value}>{followersCount || 0}</span>
                    </li>
                    {isOwnProfile && (
                        <li className={css.statsItem}>
                            <span className={css.label}>Following:</span>
                            <span className={css.value}>{followingCount || 0}</span>
                        </li>
                    )}
                </ul>
            </div>
            {isOwnProfile ? (
                <Button variant="primary" onClick={() => dispatch(openModal({ type: 'logout' }))}>
                    Log out
                </Button>
            ) : (
                <Button variant="primary" onClick={() => dispatch(followUser(user.id))}>
                    FOLLOW
                </Button>
            )}
        </div>
    );
};

export default UserInfo;
