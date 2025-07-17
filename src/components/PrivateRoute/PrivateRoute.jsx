import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { openModal } from '../../features/modal/modalSlice';

// Приватний маршрут: показує children тільки якщо isAuth === true
const PrivateRoute = ({ isAuth, children }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isAuth) {
            // якщо не авторизовані, відкриваємо модальне вікно авторизації
            dispatch(openModal({ type: 'login' }));
        }
    }, [isAuth, dispatch]);

    if (!isAuth) {
        // якщо не авторизовані, редірект на головну
        return <Navigate to='/' state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;
