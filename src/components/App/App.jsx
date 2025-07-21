import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import SharedLayout from '../SharedLayout/SharedLayout.jsx';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserFavoritesRecipes } from '../../redux/profile/profileOperations';
import './App.css';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const RecipePage = lazy(() => import('../../pages/RecipePage/RecipePage'));
const AddRecipePage = lazy(() => import('../../pages/AddRecipePage/AddRecipePage'));
const UserPage = lazy(() => import('../../pages/UserPage/UserPage'));

function App() {
    // Отримуємо статус авторизації з redux
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth.isAuth) || !!localStorage.getItem('token');
    useEffect(() => {
        if (isAuth) {
            dispatch(fetchUserFavoritesRecipes({ page: 1, limit: 100 }));
        }
    }, [isAuth, dispatch]);
 
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<SharedLayout />}>
                    {/* Публічні сторінки */}
                    <Route index element={<HomePage />} />
                    <Route path="recipe/:id" element={<RecipePage />} />

                    {/* Приватні сторінки — доступні тільки для авторизованих */}
                    <Route
                        path="recipe/add"
                        element={
                            <PrivateRoute isAuth={isAuth}>
                                <AddRecipePage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="user/:id"
                        element={
                            <PrivateRoute isAuth={isAuth}>
                                <UserPage />
                            </PrivateRoute>
                        }
                    />

                    {/* TODO: Додати 404 сторінку */}
                    {/* <Route path="*" element={<NotFoundPage />} /> */}
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;
