import { useDispatch, useSelector } from 'react-redux';
import Modal from '../common/ui/Modal/Modal';
import Button from '../common/ui/Button/Button';
import Subtitle from '../common/ui/Subtitle/Subtitle';
import { logout } from '../../features/auth/authSlice';
import { closeModal } from '../../features/modal/modalSlice';
import styles from './LogoutModal.module.css';

// Модалка логауту користувача
const LogoutModal = () => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(logout())
            .unwrap()
            .then(() => dispatch(closeModal()));
    };

    return (
        <Modal isOpen={true} onClose={() => dispatch(closeModal())}>
            <div className={styles.content}>
                <Subtitle size='large' as='h2' align='center'>
                    ARE YOU LOGGING OUT?
                </Subtitle>
                <div className={styles.text}>You can always log back in at my time.</div>
                <div className={styles.buttons}>
                    <Button
                        className={styles.logoutBtn}
                        type='button'
                        onClick={handleLogout}
                        disabled={isLoading}
                        size='large'
                        fullWidth>
                        {isLoading ? 'Processing...' : 'LOG OUT'}
                    </Button>
                    <Button
                        type='button'
                        variant='white'
                        onClick={() => dispatch(closeModal())}
                        size='large'
                        fullWidth>
                        CANCEL
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default LogoutModal;
