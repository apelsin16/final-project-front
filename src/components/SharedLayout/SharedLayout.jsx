// SharedLayout.jsx
import { Outlet, Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchCurrentUser,
  setSessionLoading,
} from '../../features/auth/authSlice';

export default function SharedLayout() {
  const dispatch = useDispatch();
  // При монтуванні layout пробуємо відновити користувача по токену
  useEffect(() => {
    dispatch(setSessionLoading(true));
    dispatch(fetchCurrentUser()).finally(() => {
      dispatch(setSessionLoading(false));
    });
  }, [dispatch]);

  return (
    // Семантична структура layout
    <>
      {/* Хедер застосунку (логотип, навігація, авторизація) */}
      <header>
        <Header />
      </header>
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
