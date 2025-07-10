import './App.css';
import { Routes, Route } from 'react-router';
import SharedLayout from '../SharedLayout/SharedLayout';
import HomePage from '../HomePage/HomePage';
import RecipePage from '../RecipePage/RecipePage';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import AddRecipePage from '../AddRecipePage/AddRecipePage';
import UserPage from '../UserPage/UserPage';
import ConstantsExample from '../../styles/constants.example';
import ButtonExample from '../common/ui/Button/Button.example';

function App() {
    return (
        <Routes>
            <Route path='/' element={<SharedLayout />}>
                {/* Публічні сторінки */}
                <Route
                    index
                    element={
                        <>
                            <ConstantsExample />
                            <ButtonExample />
                            <HomePage />
                        </>
                    }
                />
                <Route path='recipe/:id' element={<RecipePage />} />

                {/* Приватні сторінки */}
                <Route
                    path='recipe/add'
                    element={
                        <PrivateRoute>
                            <AddRecipePage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='user/:id'
                    element={
                        <PrivateRoute>
                            <UserPage />
                        </PrivateRoute>
                    }
                />

                {/* Можна додати 404 сторінку */}
                {/* <Route path="*" element={<NotFoundPage />} /> */}
            </Route>
        </Routes>
    );
}

export default App;
