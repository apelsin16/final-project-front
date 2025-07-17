// SharedLayout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Hero from '../Hero/Hero';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser, setSessionLoading } from '../../features/auth/authSlice';

export default function SharedLayout() {
    const dispatch = useDispatch();

    const location = useLocation();

    const id = useSelector(state => state.auth.user?.id);
    // При монтуванні layout пробуємо відновити користувача по токену
    useEffect(() => {
        dispatch(setSessionLoading(true));
        dispatch(fetchCurrentUser()).finally(() => {
            dispatch(setSessionLoading(false));
        });
    }, [dispatch]);

    const isHomePage = location.pathname === '/';

    return (
        // Семантична структура layout
        <>
            {/* Хедер застосунку (логотип, навігація, авторизація) */}
            <header>{isHomePage ? <Hero /> : <Header />}</header>
            {/* Основний контент сторінки */}
            <main>
                {/* Контейнер для обмеження ширини і відступів (адаптивність — через CSS) */}
                <div className="container">
                    <Outlet />
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
}
