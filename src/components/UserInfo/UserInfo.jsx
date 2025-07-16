import css from "./UserInfo.module.css";
import UserAvatar from "../common/ui/UserAvatar/UserAvatar";

const UserInfo = ({
  user = {},
  isOwnProfile = true,
  followersCount = 0,
  followingCount = 0,
  recipesCount = 0,
  favoritesCount = 0,
}) => {
  const { name = "User", email = "", avatar } = user || {};

  return (
    <div className={css.container}>
      <UserAvatar
        isOwnProfile={isOwnProfile}
        src={avatar}
        alt={`${name}'s avatar`}
      />
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
  );
};

export default UserInfo;
