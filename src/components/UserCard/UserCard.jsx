import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import UserAvatar from "../common/ui/UserAvatar/UserAvatar";
// import Button from "";
import {
  followUser,
  unfollowUser,
  fetchFollowers,
} from "../../redux/users/userSlice";
import css from "./UserCard.module.css";

const UserCard = ({ user, activeTab }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUserFollowing = useSelector(
    (state) => state.user.following || []
  );

  const [isFollowing, setIsFollowing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const userId = user._id || user.id;

  useEffect(() => {
    const alreadyFollowing = currentUserFollowing.some(
      (u) => (u._id || u.id) === userId
    );
    setIsFollowing(alreadyFollowing);
  }, [currentUserFollowing, userId]);

  const handleFollowToggle = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      if (isFollowing) {
        await dispatch(unfollowUser(userId)).unwrap();
        setIsFollowing(false);
        dispatch(fetchFollowers());
        if (activeTab === "following") {
          setIsVisible(false); // ховаємо картку
        }
      } else {
        await dispatch(followUser(userId)).unwrap();
        setIsFollowing(true);
        dispatch(fetchFollowers());
      }
    } catch (error) {
      console.error("Follow toggle error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={css.userCard}>
      <div
        className={css.userInfo}
        onClick={() => navigate(`/users/${userId}`)}
      >
        <UserAvatar
          src={user.avatar}
          showUpload={false}
          className={css.avatar}
        />
        <div className={css.infoText}>
          <p className={css.name}>{user.name}</p>
          <p className={css.recipesCount}>{user.recipesCount || 0} recipes</p>
        </div>
      </div>

      <Button
        onClick={handleFollowToggle}
        variant={isFollowing ? "following" : "follow"}
        onMouseEnter={() => isFollowing && setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={clsx(
          css.followBtn,
          isFollowing && isHovering && css.unfollowHover
        )}
        disabled={isProcessing}
      >
        {isProcessing
          ? "..."
          : isFollowing
          ? isHovering
            ? "Unfollow"
            : "Following"
          : "Follow"}
      </Button>
    </div>
  );
};

export default UserCard;
