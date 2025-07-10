import Input from './Input';
import { useState } from 'react';

const InputExample = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateEmail = value => {
        if (!value) {
            setEmailError('Email is required');
        } else if (!/\S+@\S+\.\S+/.test(value)) {
            setEmailError('Please enter a valid email');
        } else {
            setEmailError('');
        }
    };

    const validatePassword = value => {
        if (!value) {
            setPasswordError('Password is required');
        } else if (value.length < 6) {
            setPasswordError('Password must be at least 6 characters');
        } else {
            setPasswordError('');
        }
    };

    const handleEmailChange = value => {
        setEmail(value);
        validateEmail(value);
    };

    const handlePasswordChange = value => {
        setPassword(value);
        validatePassword(value);
    };

    return (
        <div
            style={{
                padding: '20px',
                maxWidth: '400px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
            }}>
            <h3>Input Examples</h3>

            <Input
                type='email'
                value={email}
                onChange={handleEmailChange}
                placeholder='Enter your email'
                label='Email Address (Large - 56px)'
                size='large'
                required
                error={emailError}
            />

            <Input
                type='text'
                value={name}
                onChange={setName}
                placeholder='Enter your full name'
                label='Full Name (Large - 56px)'
                size='large'
                required
            />

            <Input
                type='text'
                value={description}
                onChange={setDescription}
                placeholder='Enter description'
                label='Description (Small - 48px)'
                size='small'
            />

            <Input
                type='password'
                value={password}
                onChange={handlePasswordChange}
                placeholder='Enter your password'
                label='Password (Small - 48px)'
                size='small'
                required
                error={passwordError}
            />

            <Input
                type='password'
                value={confirmPassword}
                onChange={setConfirmPassword}
                placeholder='Confirm your password'
                label='Confirm Password (Large - 56px)'
                size='large'
                required
            />

            <Input
                type='email'
                value='disabled@example.com'
                onChange={() => {}}
                placeholder='Disabled input'
                label='Disabled Field (Small - 48px)'
                size='small'
                disabled
            />

            <div
                style={{
                    marginTop: '20px',
                    padding: '15px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                }}>
                <h4>Current Values:</h4>
                <p>
                    <strong>Email:</strong> {email}
                </p>
                <p>
                    <strong>Full Name:</strong> {name}
                </p>
                <p>
                    <strong>Description:</strong> {description}
                </p>
                <p>
                    <strong>Password:</strong> {password}
                </p>
                <p>
                    <strong>Confirm Password:</strong> {confirmPassword}
                </p>
            </div>
        </div>
    );
};

export default InputExample;
