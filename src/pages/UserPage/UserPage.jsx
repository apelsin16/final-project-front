import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import iziToast from 'izitoast';

import * as selectors from '../../redux/profile/profileSelectors';
import {
    fetchUserFavoritesRecipes,
    fetchUserFollowers,
    fetchUserFollowing,
    fetchUserRecipes,
    fetchOtherUserRecipes,
    fetchOtherUserFollowers,
} from '../../redux/profile/profileOperations';

import { fetchUserById } from '../../features/user/userSlice';

import { TabsList } from '../../components/TabsList/TabsList';
import { ListItems } from '../../components/ListItems/ListItems';
import RecipePagination from '../../components/RecipePagination/RecipePagination';
import { FollowList } from '../../components/FollowList/FollowList';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import Spinner from '../../components/Spinner/Spinner';
import UserInfo from '../../components/UserInfo/UserInfo';

import styles from './UserPage.module.css';

const TABS_CONFIG = {
    authenticated: ['MY RECIPES', 'MY FAVORITES', 'FOLLOWERS', 'FOLLOWING'],
    otherUser: ['RECIPES', 'FOLLOWERS'],
};

function UserPage() {
    const dispatch = useDispatch();
    const { id: userIdParam } = useParams();

    const auth = useSelector(state => state.auth);
    const viewed = useSelector(state => state.user.viewed);

    const currentUserId = auth.user?.id || null;
    const isAuth = auth.isAuth || !!localStorage.getItem('token');

    // якщо в URL нема id (наприклад /user замість /user/:id), показуємо свій профіль
    const isCurrentUser = !userIdParam || userIdParam === currentUserId;
    const effectiveUserId = userIdParam ?? currentUserId;

    /* ---------------- load viewed user (інший профіль) ---------------- */
    useEffect(() => {
        if (!isCurrentUser && effectiveUserId) {
            // не фетчимо повторно, якщо вже є профіль з тим же id
            if (!viewed || viewed.id !== effectiveUserId) {
                dispatch(fetchUserById(effectiveUserId));
            }
        }
        // важливо: БЕЗ viewed у залежностях, щоб уникнути циклу
    }, [dispatch, effectiveUserId, isCurrentUser]);

    /* ---------------- profile store selectors ---------------- */
    const {
        recipes,
        favorites,
        followers,
        following,
        otherRecipes,
        otherFollowers,
        recipesPagination,
        favoritesPagination,
        followersPagination,
        followingPagination,
        otherRecipesPagination,
        otherFollowersPagination,
        error,
        loading,
    } = {
        recipes: useSelector(selectors.selectUserRecipes),
        favorites: useSelector(selectors.selectUserFavoritesRecipes),
        followers: useSelector(selectors.selectUserFollowers),
        following: useSelector(selectors.selectUserFollowing),
        otherRecipes: useSelector(selectors.selectOtherUserRecipes),
        otherFollowers: useSelector(selectors.selectOtherUserFollowers),
        recipesPagination: useSelector(selectors.selectRecipesPagination),
        favoritesPagination: useSelector(selectors.selectFavoritesPagination),
        followersPagination: useSelector(selectors.selectFollowersPagination),
        followingPagination: useSelector(selectors.selectFollowingPagination),
        otherRecipesPagination: useSelector(selectors.selectOtherRecipesPagination),
        otherFollowersPagination: useSelector(selectors.selectOtherFollowersPagination),
        error: useSelector(selectors.selectProfileError),
        loading: useSelector(selectors.selectProfileLoading),
    };

    /* ---------------- tabs state ---------------- */
    const [tabs, setTabs] = useState([]);
    const [activeTab, setActiveTab] = useState('');
    const [pages, setPages] = useState({
        recipes: 1,
        favorites: 1,
        followers: 1,
        following: 1,
    });

    const getTabs = useCallback(
        () => (isCurrentUser ? TABS_CONFIG.authenticated : TABS_CONFIG.otherUser),
        [isCurrentUser]
    );

    const getActionForTab = useCallback(() => {
        const baseParams = { limit: 9 };

        switch (activeTab) {
            case 'MY RECIPES':
                return fetchUserRecipes({ page: pages.recipes, ...baseParams });
            case 'RECIPES':
                return fetchOtherUserRecipes({
                    userId: effectiveUserId,
                    page: pages.recipes,
                    ...baseParams,
                });
            case 'MY FAVORITES':
                return fetchUserFavoritesRecipes({
                    page: pages.favorites,
                    ...baseParams,
                });
            case 'FOLLOWERS':
                return isCurrentUser
                    ? fetchUserFollowers({ page: pages.followers, ...baseParams })
                    : fetchOtherUserFollowers({
                          userId: effectiveUserId,
                          page: pages.followers,
                          ...baseParams,
                      });
            case 'FOLLOWING':
                return fetchUserFollowing({ page: pages.following, ...baseParams });
            default:
                return null;
        }
    }, [
        activeTab,
        pages.recipes,
        pages.favorites,
        pages.followers,
        pages.following,
        isCurrentUser,
        effectiveUserId,
    ]);

    /* ---------------- init tabs when profile changes (current vs other) ---------------- */
    useEffect(() => {
        const newTabs = getTabs();
        setTabs(newTabs);
        setActiveTab(prev => (newTabs.includes(prev) ? prev : newTabs[0] || 'RECIPES'));
        setPages({ recipes: 1, favorites: 1, followers: 1, following: 1 });
    }, [getTabs]);

    /* ---------------- prefetch following relationships for current user ---------------- */
    useEffect(() => {
        if (isAuth && currentUserId) {
            dispatch(fetchUserFollowing({ page: 1, limit: 100 }));
        }
    }, [isAuth, currentUserId, dispatch]);

    /* ---------------- load tab content when tab/page changes ---------------- */
    useEffect(() => {
        const action = getActionForTab();
        if (action) {
            dispatch(action)
                .unwrap()
                .catch(err => {
                    iziToast.error({
                        title: 'Error',
                        message: 'Failed to load content for the selected tab.',
                        position: 'topRight',
                    });
                    console.error('Tab fetch failed:', err);
                });
        }
    }, [activeTab, pages, getActionForTab, dispatch]);

    /* ---------------- retry handler ---------------- */
    const onRetry = () => {
        const action = getActionForTab();
        if (action) dispatch(action);
    };

    /* ---------------- derive data for render ---------------- */
    const resolvedRecipes = isCurrentUser ? recipes : otherRecipes;
    const resolvedFollowers = isCurrentUser ? followers : otherFollowers;
    const resolvedRecipesPagination = isCurrentUser ? recipesPagination : otherRecipesPagination;
    const resolvedFollowersPagination = isCurrentUser
        ? followersPagination
        : otherFollowersPagination;

    /* ---------------- content renderer ---------------- */
    const renderContent = () => {
        if (error) {
            return <ErrorMessage error={error} onRetry={onRetry} />;
        }

        switch (activeTab) {
            case 'MY RECIPES':
            case 'RECIPES':
                return (
                    <>
                        <ListItems
                            recipes={resolvedRecipes}
                            isLoading={loading}
                            isCurrentUser={isCurrentUser}
                        />
                        <RecipePagination
                            currentPage={resolvedRecipesPagination?.currentPage || 1}
                            totalPages={resolvedRecipesPagination?.totalPages || 1}
                            onPageChange={page => setPages(p => ({ ...p, recipes: page }))}
                        />
                    </>
                );
            case 'MY FAVORITES':
                return (
                    <>
                        <ListItems
                            recipes={favorites}
                            isLoading={loading}
                            isCurrentUser={isCurrentUser}
                            isFavorite
                        />
                        <RecipePagination
                            currentPage={favoritesPagination?.currentPage || 1}
                            totalPages={favoritesPagination?.totalPages || 1}
                            onPageChange={page => setPages(p => ({ ...p, favorites: page }))}
                        />
                    </>
                );
            case 'FOLLOWERS':
                return (
                    <>
                        <FollowList
                            connectionList={resolvedFollowers}
                            isCheckFollowing={false}
                            isCurrentUser={isCurrentUser}
                        />
                        <RecipePagination
                            currentPage={resolvedFollowersPagination?.currentPage || 1}
                            totalPages={resolvedFollowersPagination?.totalPages || 1}
                            onPageChange={page => setPages(p => ({ ...p, followers: page }))}
                        />
                    </>
                );
            case 'FOLLOWING':
                return (
                    <>
                        <FollowList
                            connectionList={following}
                            isCheckFollowing
                            isCurrentUser={isCurrentUser}
                        />
                        <RecipePagination
                            currentPage={followingPagination?.currentPage || 1}
                            totalPages={followingPagination?.totalPages || 1}
                            onPageChange={page => setPages(p => ({ ...p, following: page }))}
                        />
                    </>
                );
            default:
                return <p>No content available</p>;
        }
    };

    /* ---------------- waiting for viewed profile when not current ---------------- */
    if (!isCurrentUser && !viewed) {
        return <Spinner />;
    }

    // нормалізуємо shape: бекенд може повернути {id,...} або {user:{},stats:{}}
    const viewedUser = viewed?.user || viewed || null;
    const viewedStats = viewed?.stats || {};

    return (
        <div className={styles.wrapper}>
            <UserInfo
                user={isCurrentUser ? auth.user : viewedUser}
                isOwnProfile={isCurrentUser}
                followersCount={
                    isCurrentUser
                        ? resolvedFollowersPagination?.total || resolvedFollowers.length
                        : viewedStats.followersCount ?? 0
                }
                followingCount={
                    isCurrentUser
                        ? followingPagination?.total || following.length
                        : viewedStats.followingCount ?? 0
                }
                recipesCount={
                    isCurrentUser
                        ? recipesPagination?.total || resolvedRecipes.length
                        : viewedStats.ownRecipesCount ?? 0
                }
                favoritesCount={
                    isCurrentUser ? favoritesPagination?.total || favorites.length : 0 // або viewedStats.favoritesCount, якщо бекенд повертає
                }
            />

            <TabsList tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
            {renderContent()}
        </div>
    );
}

export default UserPage;
