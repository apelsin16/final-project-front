// SharedLayout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser, setSessionLoading } from '../../features/auth/authSlice';
import { fetchFavorites } from '../../features/recipes/recipesSlice';

export default function SharedLayout() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { isAuth } = useSelector(state => state.auth);

    // При монтуванні layout пробуємо відновити користувача по токену
    useEffect(() => {
        dispatch(setSessionLoading(true));
        dispatch(fetchCurrentUser()).finally(() => {
            dispatch(setSessionLoading(false));
        });
    }, [dispatch]);

    // Завантажуємо улюблені рецепти коли користувач авторизований
    useEffect(() => {
        if (isAuth) {
            dispatch(fetchFavorites());
        }
    }, [isAuth, dispatch]);

    // Не показуємо Header на HomePage, оскільки Hero містить свій власний header
    const showHeader = location.pathname !== '/';

    return (
        // Семантична структура layout
        <>
            {/* Хедер застосунку (логотип, навігація, авторизація) */}
            {showHeader && (
                <header>
                    <Header />
                </header>
            )}
            {/* Основний контент сторінки */}
            <main>
                {/* Контейнер для обмеження ширини і відступів (адаптивність — через CSS) */}
                <div className='container'>
                    <Outlet />
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
}
