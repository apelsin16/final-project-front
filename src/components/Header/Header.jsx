import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../common/ui/Button/Button';
import LoginModal from '../modals/LoginModal';
import RegisterModal from '../modals/RegisterModal';
import LogoutModal from '../modals/LogoutModal';
import { openModal } from '../../features/modal/modalSlice';

function Header() {
    // Отримуємо статус авторизації, тип модалки та дані користувача з redux
    const isAuth = useSelector(state => state.auth.isAuth);
    const modalType = useSelector(state => state.modal.modalType);
    const user = useSelector(state => state.auth.user);
    const isSessionLoading = useSelector(state => state.auth.isSessionLoading);
    const dispatch = useDispatch();

    // Показуємо лоадер, поки триває відновлення сесії
    if (isSessionLoading) {
        return (
            <header>
                <div style={{ padding: 16, textAlign: 'right' }}>Loading...</div>
            </header>
        );
    }

    return (
        <header>
            <div className='container'>
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>Головна</Link>
                        </li>
                        <li>
                            <Link to='/recipe/1df085f0-f09a-4082-8b7b-1eb9a17310f9'>Рецепт</Link>
                        </li>
                        <li>
                            <Link to='/recipe/add'>Додати рецепт</Link>
                        </li>
                        {/* Кнопки авторизації/реєстрації/логаут */}
                        {!isAuth && (
                            <>
                                <li>
                                    <Button
                                        variant='primary'
                                        size='small'
                                        onClick={() => dispatch(openModal({ type: 'login' }))}>
                                        Login
                                    </Button>
                                </li>
                                <li>
                                    <Button
                                        variant='white'
                                        size='small'
                                        onClick={() => dispatch(openModal({ type: 'register' }))}>
                                        Register
                                    </Button>
                                </li>
                            </>
                        )}
                        {isAuth && (
                            <>
                                <li>
                                    <Button
                                        variant='primary'
                                        size='small'
                                        onClick={() => dispatch(openModal({ type: 'logout' }))}>
                                        Logout
                                    </Button>
                                </li>
                                {/* Відображення імені та аватарки користувача */}
                                {user && (
                                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {/* Аватарка або ініціал */}
                                        {user.avatarUrl ? (
                                            <img
                                                src={user.avatarUrl}
                                                alt={user.name || 'User'}
                                                style={{
                                                    width: 32,
                                                    height: 32,
                                                    borderRadius: '50%',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        ) : (
                                            <div
                                                style={{
                                                    width: 32,
                                                    height: 32,
                                                    borderRadius: '50%',
                                                    background: '#eee',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontWeight: 700,
                                                    fontSize: 16,
                                                    color: '#555',
                                                }}>
                                                {user.name ? user.name[0].toUpperCase() : '?'}
                                            </div>
                                        )}
                                        {/* Ім'я користувача */}
                                        <span style={{ fontWeight: 500 }}>{user.name}</span>
                                    </li>
                                )}
                            </>
                        )}
                    </ul>
                </nav>
                {/* Модальні вікна */}
                {modalType === 'login' && <LoginModal />}
                {modalType === 'register' && <RegisterModal />}
                {modalType === 'logout' && <LogoutModal />}
            </div>
        </header>
    );
}

export default Header;
