import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../common/ui/Modal/Modal';
import Input from '../common/ui/Input/Input';
import Button from '../common/ui/Button/Button';
import Subtitle from '../common/ui/Subtitle/Subtitle';
import { register } from '../../features/auth/authSlice';
import { closeModal, openModal } from '../../features/modal/modalSlice';
import { validateEmail, validatePassword, validateName } from '../../utils/validation';
import styles from './RegisterModal.module.css';

// Валідація імені: мінімум 3 символи

// Модалка реєстрації користувача
const RegisterModal = () => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state.auth);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Обробники змін
    const handleNameChange = value => {
        setName(value);
        setNameError(validateName(value));
    };
    const handleEmailChange = value => {
        setEmail(value);
        setEmailError(validateEmail(value));
    };
    const handlePasswordChange = value => {
        setPassword(value);
        setPasswordError(validatePassword(value));
    };

    // Сабміт форми реєстрації
    const handleSubmit = e => {
        e.preventDefault();
        const nameErr = validateName(name);
        const emailErr = validateEmail(email);
        const passwordErr = validatePassword(password);
        setNameError(nameErr);
        setEmailError(emailErr);
        setPasswordError(passwordErr);
        if (nameErr || emailErr || passwordErr) return;
        dispatch(register({ name, email, password }))
            .unwrap()
            .then(() => dispatch(closeModal()));
    };

    return (
        <Modal isOpen={true} onClose={() => dispatch(closeModal())}>
            <form className={styles.form} onSubmit={handleSubmit} autoComplete='off'>
                <Subtitle size='large' as='h2' align='left'>
                    Sign up
                </Subtitle>
                <div className={styles.inputs}>
                    <Input
                        type='text'
                        name='name'
                        placeholder='Name*'
                        value={name}
                        onChange={handleNameChange}
                        required
                        size='large'
                        autoFocus
                        error={nameError}
                    />
                    <Input
                        type='email'
                        name='email'
                        placeholder='Email*'
                        value={email}
                        onChange={handleEmailChange}
                        required
                        size='large'
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
                </div>
                <Button
                    type='submit'
                    disabled={
                        isLoading || !name || !email || !password || nameError || emailError || passwordError
                    }
                    size='large'
                    fullWidth>
                    {isLoading ? 'Processing...' : 'Create'}
                </Button>
            </form>
            <div className={styles.bottomText}>
                I already have an account?{' '}
                <span
                    className={styles.link}
                    onClick={() => {
                        dispatch(closeModal());
                        dispatch(openModal({ type: 'login' }));
                    }}
                    role='button'
                    tabIndex={0}>
                    Sign in
                </span>
            </div>
        </Modal>
    );
};

export default RegisterModal;
