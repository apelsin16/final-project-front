import './App.css';
import { Routes, Route } from 'react-router';
import SharedLayout from '../SharedLayout/SharedLayout.jsx';
import HomePage from '../../pages/HomePage/HomePage.jsx';
import RecipePage from '../../pages/RecipePage/RecipePage';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import AddRecipePage from '../../pages/AddRecipePage/AddRecipePage';
import UserPage from '../../pages/UserPage/UserPage';
import UIExamplesPage from '../UIExamplesPage/UIExamplesPage';
import { useSelector } from 'react-redux';

function App() {
    // Отримуємо статус авторизації з redux
    const isAuth = useSelector(state => state.auth.isAuth);

    return (
        <Routes>
            <Route path='/' element={<SharedLayout />}>
                {/* Публічні сторінки */}
                <Route index element={<HomePage />} />
                <Route path='ui' element={<UIExamplesPage />} />
                <Route path='recipe/:id' element={<RecipePage />} />

                {/* Приватні сторінки — доступні тільки для авторизованих */}
                <Route
                    path='recipe/add'
                    element={
                        // <PrivateRoute isAuth={isAuth}>
                            <AddRecipePage />
                        // </PrivateRoute>
                    }
                />
                <Route
                    path='user/:id'
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
    );
}

export default App;
