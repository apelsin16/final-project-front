import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children })  => {
  const isAuthenticated = true /* логіка авторизації, напр. useSelector або контекст */;
  const location = useLocation();

  if (!isAuthenticated) {
    // якщо не авторизовані, редірект на домашню або сторінку логіну
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default PrivateRoute;