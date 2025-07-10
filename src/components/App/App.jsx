import './App.css';
import { Routes, Route } from 'react-router';
import SharedLayout from '../SharedLayout/SharedLayout';
import HomePage from '../HomePage/HomePage';
import RecipePage from '../RecipePage/RecipePage';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import AddRecipePage from '../AddRecipePage/AddRecipePage';
import UserPage from '../UserPage/UserPage';
import ButtonExample from '../common/ui/Button/Button.example';
import ExampleComponent from '../../styles/example-usage';
import Typography from '../../styles/Typography';
import { Button } from '../common/ui';
import IconButtonExample from '../common/ui/IconButton/IconButton.example';
import InputExample from '../common/ui/Input/Input.example';
import SelectExample from '../common/ui/Select/Select.example';
import MainTitleExample from '../common/ui/MainTitle/MainTitle.example';
import PathInfoExample from '../common/ui/PathInfo/PathInfo.example';
import SubtitleExample from '../common/ui/Subtitle/Subtitle.example';
import ModalExample from '../common/ui/Modal/Modal.example';

function App() {
    return (
        <Routes>
            <Route path='/' element={<SharedLayout />}>
                {/* Публічні сторінки */}
                <Route
                    index
                    element={
                        <>
                            <Button variant='primary' size='large' disabled>
                                Primary Button
                            </Button>
                            <Button variant='white' size='large'>
                                White Button
                            </Button>
                            <IconButtonExample />
                            <InputExample />
                            <SelectExample />
                            <MainTitleExample />
                            <PathInfoExample />
                            <SubtitleExample />
                            <ModalExample />
                            <Typography />
                            <ExampleComponent />
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
