import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import styles from '../../styles/Header.module.css';
import { openModal } from '../../features/modal/modalSlice';
import LoginModal from '../modals/LoginModal';
import RegisterModal from '../modals/RegisterModal';
import LogoutModal from '../modals/LogoutModal';

function Header() {
  const isAuth = true;
const user = {
  name: 'VICTORIA',
  avatarUrl: 'https://i.pravatar.cc/100?img=47',
};
  const modalType = useSelector(state => state.modal.modalType);
  const isSessionLoading = useSelector(state => state.auth.isSessionLoading);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');

  if (isSessionLoading) {
    return <header className={styles.header}><div>Loading...</div></header>;
  }

  return (
    <header className={`${styles.header} ${!isAuth ? styles.unauth : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>foodies</div>

        <nav className={styles.nav}>
          <NavLink to="/" className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.activeLink}` : styles.link}>
            HOME
          </NavLink>
          <NavLink to="/recipe/add" className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.activeLink}` : styles.link}>
            ADD RECIPE
          </NavLink>
        </nav>

        {!isAuth && (
          <div className={styles.toggleWrapper}>
            <div className={styles.toggleBackground}>
              <button
                className={`${styles.toggleBtn} ${activeTab === 'signin' ? styles.active : ''}`}
                onClick={() => {
                  setActiveTab('signin');
                  dispatch(openModal({ type: 'login' }));
                }}
              >
                SIGN IN
              </button>
              <button
                className={`${styles.toggleBtn} ${activeTab === 'signup' ? styles.active : ''}`}
                onClick={() => {
                  setActiveTab('signup');
                  dispatch(openModal({ type: 'register' }));
                }}
              >
                SIGN UP
              </button>
            </div>
          </div>
        )}

        {isAuth && user && (
          <div className={styles.userMenu}>
            <div className={styles.avatarWrapper}>
              <img src={user.avatarUrl} alt={user.name} className={styles.avatar} />
              <button
                className={styles.userToggle}
                onClick={() => setIsMenuOpen(prev => !prev)}
              >
                <span className={styles.username}>{user.name}</span>
                <span className={styles.arrow}>
                  <svg width="18" height="18" viewBox="0 0 10 6" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L5 5L9 1" stroke="currentColor"
                      strokeWidth="1.5" strokeLinecap="round"
                      strokeLinejoin="round" />
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
