import { Navigate, useLocation } from 'react-router-dom';

// Приватний маршрут: показує children тільки якщо isAuth === true
const PrivateRoute = ({ isAuth, children }) => {
    const location = useLocation();

    if (!isAuth) {
        // якщо не авторизовані, редірект на головну
        return <Navigate to='/' state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;
