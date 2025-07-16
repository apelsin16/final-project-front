export const selectUserRecipes = state => state.profile.recipes;
export const selectUserFavoritesRecipes = state => state.profile.favorites;
export const selectUserFollowers = state => state.profile.followers;
export const selectUserFollowing = state => state.profile.following;

export const selectRecipesPagination = state => state.profile.pagination;
export const selectFavoritesPagination = state =>
  state.profile.favoritesPagination;
export const selectFollowersPagination = state =>
  state.profile.followersPagination;
export const selectFollowingPagination = state =>
  state.profile.followingPagination;

export const selectOtherUserRecipes = state => state.profile.otherRecipes;
export const selectOtherUserFollowers = state => state.profile.otherFollowers;
export const selectOtherRecipesPagination = state =>
  state.profile.otherRecipesPagination;
export const selectOtherFollowersPagination = state =>
  state.profile.otherFollowersPagination;

export const selectProfileError = state => state.profile.error;
export const selectProfileLoading = state => state.profile.loading;
