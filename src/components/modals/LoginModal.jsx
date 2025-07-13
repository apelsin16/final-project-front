import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../common/ui/Modal/Modal';
import Input from '../common/ui/Input/Input';
import Button from '../common/ui/Button/Button';
import Subtitle from '../common/ui/Subtitle/Subtitle';
import { login } from '../../features/auth/authSlice';
import { closeModal, openModal } from '../../features/modal/modalSlice';
import { validatePassword, validateEmail } from '../../utils/validation';
import styles from './LoginModal.module.css';

// Модалка логіну користувача
const LoginModal = () => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Обробник зміни email
    const handleEmailChange = value => {
        setEmail(value);
        setEmailError(validateEmail(value));
    };

    // Обробник зміни пароля
    const handlePasswordChange = value => {
        setPassword(value);
        setPasswordError(validatePassword(value));
    };

    // Сабміт форми логіну
    const handleSubmit = e => {
        e.preventDefault();
        const emailErr = validateEmail(email);
        const passwordErr = validatePassword(password);
        setEmailError(emailErr);
        setPasswordError(passwordErr);
        if (emailErr || passwordErr) return;
        dispatch(login({ email, password }))
            .unwrap()
            .then(() => dispatch(closeModal()));
    };

    return (
        <Modal isOpen={true} onClose={() => dispatch(closeModal())}>
            <form className={styles.form} onSubmit={handleSubmit} autoComplete='off'>
                <Subtitle size='large' as='h2' align='left'>
                    Sign in
                </Subtitle>
                <div className={styles.inputs}>
                    <Input
                        type='email'
                        name='email'
                        placeholder='Email*'
                        value={email}
                        onChange={handleEmailChange}
                        required
                        size='large'
                        autoFocus
                        autoComplete='email'
                        error={emailError}
                    />
                    <Input
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        size='large'
                        error={passwordError}
                    />
                    {/* {passwordError && <div className={styles.error}>{passwordError}</div>} */}
                </div>
                <Button
                    type='submit'
                    disabled={isLoading || !email || !password || emailError || passwordError}
                    size='large'
                    fullWidth>
                    {isLoading ? 'Processing...' : 'Sign in'}
                </Button>
            </form>
            <div className={styles.bottomText}>
                Don&apos;t have an account?{' '}
                <span
                    className={styles.link}
                    onClick={() => {
                        dispatch(closeModal());
                        dispatch(openModal({ type: 'register' }));
                    }}
                    role='button'
                    tabIndex={0}>
                    Create an account
                </span>
            </div>
        </Modal>
    );
};

export default LoginModal;
