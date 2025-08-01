import React from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import css from "./UserAvatar.module.css";
import { updateUserAvatar } from "../../../../features/user/userSlice.js";
import UploadAvatar from "../UploadAvatar/UploadAvatar";

function UserAvatar({
  avatarType = "user",
  isOwnProfile = true,
  showUpload = true,
  className = "",
  src = null,
  alt = "User avatar",
}) {
  const dispatch = useDispatch();
  const currentUserAvatar = useSelector((state) => state.user.current?.avatar);
  const avatarSrc = src || (isOwnProfile ? currentUserAvatar : null);

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      await dispatch(updateUserAvatar(formData)).unwrap();
      toast.success("Avatar updated successfully!");
    } catch (error) {
      console.error("Error updating avatar:", error);
      toast.error("Failed to update avatar. Please try again.");
    }
  };

  // Визначення класу в залежності від типу аватарки або переданого класу
  const avatarClass =
    className ||
    (avatarType === "follower"
      ? css.followerAvatar
      : avatarType === "following"
      ? css.followingAvatar
      : css.userAvatar);

  return (
    <div className={css.avatarOuterWrapper}>
      <div className={`${css.avatarWrapper} ${avatarClass}`}>
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={alt}
            className={`${css.avatarImage} ${className}`}
          />
        ) : (
          <div className={css.avatarIconWrapper}>
            {currentUserAvatar && (
              <img
                src={currentUserAvatar}
                alt="User avatar"
                className={css.icon}
              />
            )}
          </div>
        )}
      </div>

      {isOwnProfile && showUpload && (
        <label className={css.avatarInputWrapper}>
          <UploadAvatar />
          <input
            type="file"
            accept="image/*"
            className={css.avatarInput}
            onChange={handleAvatarChange}
            hidden
          />
        </label>
      )}
    </div>
  );
}

export default UserAvatar;
