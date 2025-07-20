import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import iziToast from 'izitoast';
import styles from './UserPage.module.css';

import * as selectors from '../../redux/profile/profileSelectors';
import {
    fetchUserFavoritesRecipes,
    fetchUserFollowers,
    fetchUserFollowing,
    fetchUserRecipes,
    fetchOtherUserRecipes,
    fetchOtherUserFollowers,
} from '../../redux/profile/profileOperations';

import { TabsList } from '../../components/TabsList/TabsList';
import { ListItems } from '../../components/ListItems/ListItems';
import RecipePagination from '../../components/RecipePagination/RecipePagination';
import { FollowList } from '../../components/FollowList/FollowList';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import Spinner from '../../components/Spinner/Spinner';

const TABS_CONFIG = {
    authenticated: ['MY RECIPES', 'MY FAVORITES', 'FOLLOWERS', 'FOLLOWING'],
    otherUser: ['RECIPES', 'FOLLOWERS'],
};

function UserPage({ isAuth: isAuthProp }) {
    const dispatch = useDispatch();
    const { id: userId } = useParams();

    const auth = useSelector(state => state.auth);
    const currentUserId = auth.user?.id || null;
    const isAuth = isAuthProp ?? auth.isAuth;

    const isCurrentUser = !userId || userId === currentUserId;
    const effectiveUserId = userId;

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

    const [tabs, setTabs] = useState([]);
    const [activeTab, setActiveTab] = useState('');
    const [pages, setPages] = useState({
        recipes: 1,
        favorites: 1,
        followers: 1,
        following: 1,
    });

    const getTabs = useCallback(() => {
        return isCurrentUser ? TABS_CONFIG.authenticated : TABS_CONFIG.otherUser;
    }, [isCurrentUser]);

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

    useEffect(() => {
        const newTabs = getTabs();
        setTabs(newTabs);
        setActiveTab(prev => (newTabs.includes(prev) ? prev : newTabs[0] || 'RECIPES'));
        setPages({ recipes: 1, favorites: 1, followers: 1, following: 1 });
    }, [getTabs]);

    useEffect(() => {
        if (isAuth && currentUserId) {
            dispatch(fetchUserFollowing({ page: 1, limit: 100 }));
        }
    }, [isAuth, currentUserId, dispatch]);

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

    const onRetry = () => {
        const action = getActionForTab();
        if (action) dispatch(action);
    };

    const resolvedRecipes = isCurrentUser ? recipes : otherRecipes;
    const resolvedFollowers = isCurrentUser ? followers : otherFollowers;
    const resolvedRecipesPagination = isCurrentUser ? recipesPagination : otherRecipesPagination;
    const resolvedFollowersPagination = isCurrentUser
        ? followersPagination
        : otherFollowersPagination;

    const renderContent = () => {
        if (loading) return <Spinner loading={loading} />;

        if (error) {
            return <ErrorMessage error={error} onRetry={onRetry} />;
        }

        switch (activeTab) {
            case 'MY RECIPES':
            case 'RECIPES':
                return (
                    <div>
                        <ListItems recipes={resolvedRecipes} isLoading={loading} />
                        <RecipePagination
                            currentPage={resolvedRecipesPagination?.currentPage || 1}
                            totalPages={resolvedRecipesPagination?.totalPages || 1}
                            onPageChange={page => setPages(p => ({ ...p, recipes: page }))}
                        />
                    </div>
                );
            case 'MY FAVORITES':
                return (
                    <div>
                        <ListItems recipes={favorites} isLoading={loading} />
                        <RecipePagination
                            currentPage={favoritesPagination?.currentPage || 1}
                            totalPages={favoritesPagination?.totalPages || 1}
                            onPageChange={page => setPages(p => ({ ...p, favorites: page }))}
                        />
                    </div>
                );
            case 'FOLLOWERS':
                return (
                    <FollowList
                        connectionList={resolvedFollowers}
                        isCheckFollowing={false}
                        pagination={resolvedFollowersPagination}
                        setCurrentPage={page => setPages(p => ({ ...p, followers: page }))}
                        isCurrentUser={isCurrentUser}
                    />
                );
            case 'FOLLOWING':
                return (
                    <FollowList
                        connectionList={following}
                        isCheckFollowing
                        pagination={followingPagination}
                        setCurrentPage={page => setPages(p => ({ ...p, following: page }))}
                        isCurrentUser={isCurrentUser}
                    />
                );
            default:
                return <p>No content available</p>;
        }
    };

    return (
        <div className={styles.wrapper}>
            <TabsList tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
            {renderContent()}
        </div>
    );
}

export default UserPage;
