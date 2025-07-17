import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import styles from '../../styles/Header.module.css';
import { openModal } from '../../features/modal/modalSlice';
import LoginModal from '../modals/LoginModal';
import RegisterModal from '../modals/RegisterModal';
import LogoutModal from '../modals/LogoutModal';
import { Button } from '../common/ui/index';

function Header({ theme }) {
    const isAuth = useSelector(state => state.auth.isAuth);
    const user = useSelector(state => state.auth.user);

    const modalType = useSelector(state => state.modal.modalType);
    const isSessionLoading = useSelector(state => state.auth.isSessionLoading);
    const dispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('signIn');

    if (isSessionLoading) {
        return (
            <header>
                <div className="container">
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Головна</Link>
                            </li>
                            <li>
                                <Link to="/recipe/1df085f0-f09a-4082-8b7b-1eb9a17310f9">
                                    Рецепт
                                </Link>
                            </li>
                            <li>
                                <Link to="/recipe/add">Додати рецепт</Link>
                            </li>
                            {/* Кнопки авторизації/реєстрації/логаут */}
                            {!isAuth && (
                                <>
                                    <li>
                                        <Button
                                            variant="primary"
                                            size="small"
                                            onClick={() => dispatch(openModal({ type: 'login' }))}
                                        >
                                            Login
                                        </Button>
                                    </li>
                                    <li>
                                        <Button
                                            variant="white"
                                            size="small"
                                            onClick={() =>
                                                dispatch(openModal({ type: 'register' }))
                                            }
                                        >
                                            Register
                                        </Button>
                                    </li>
                                </>
                            )}
                            {isAuth && (
                                <>
                                    <li>
                                        <Button
                                            variant="primary"
                                            size="small"
                                            onClick={() => dispatch(openModal({ type: 'logout' }))}
                                        >
                                            Logout
                                        </Button>
                                    </li>
                                    {/* Відображення імені та аватарки користувача */}
                                    {user && (
                                        <li
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                            }}
                                        >
                                            {/* Аватарка або ініціал */}
                                            {user?.avatarURL ? (
                                                <img
                                                    src={user.avatarURL}
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
                                                    }}
                                                >
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
                </div>
            </header>
        );
    }

    return (
        <header className={`${styles.header} ${theme === 'dark' ? styles.dark : styles.light}`}>
            <div className={styles.container}>
                <div className={styles.logo}>foodies</div>

                <nav className={styles.nav}>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? `${styles.link} ${styles.activeLink}` : styles.link
                        }
                    >
                        HOME
                    </NavLink>
                    <NavLink
                        to="/recipe/add"
                        className={({ isActive }) =>
                            isActive ? `${styles.link} ${styles.activeLink}` : styles.link
                        }
                    >
                        ADD RECIPE
                    </NavLink>
                </nav>

                {!isAuth ? (
                    <div className={styles.toggleWrapper}>
                        <div className={styles.toggleBackground}>
                            <button
                                className={`${styles.toggleBtn} ${
                                    activeTab === 'signIn' ? styles.active : ''
                                }`}
                                onClick={() => {
                                    setActiveTab('signIn');
                                    dispatch(openModal({ type: 'login' }));
                                }}
                            >
                                SIGN IN
                            </button>
                            <button
                                className={`${styles.toggleBtn} ${
                                    activeTab === 'signUp' ? styles.active : ''
                                }`}
                                onClick={() => {
                                    setActiveTab('signUp');
                                    dispatch(openModal({ type: 'register' }));
                                }}
                            >
                                SIGN UP
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className={styles.userMenu}>
                        <div className={styles.avatarWrapper}>
                            <img src={user?.avatarUrl} alt={user?.name} className={styles.avatar} />
                            <button
                                className={styles.userToggle}
                                onClick={() => setIsMenuOpen(prev => !prev)}
                            >
                                <span className={styles.username}>{user?.name}</span>
                                <span className={styles.arrow}>
                                    <svg width="18" height="18" viewBox="0 0 10 6" fill="none">
                                        <path
                                            d="M1 1L5 5L9 1"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                            </button>
                        </div>

                        {isMenuOpen && (
                            <div className={styles.dropdown}>
                                <button className={styles.menuItem}>PROFILE</button>
                                <button
                                    className={styles.menuItem}
                                    onClick={() => dispatch(openModal({ type: 'logout' }))}
                                >
                                    LOG OUT ↗
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {modalType === 'login' && <LoginModal />}
                {modalType === 'register' && <RegisterModal />}
                {modalType === 'logout' && <LogoutModal />}
            </div>
        </header>
    );
}

export default Header;
