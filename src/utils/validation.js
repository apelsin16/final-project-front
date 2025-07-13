// Функції валідації для форм (email, password тощо)

export const validatePassword = value => {
    if (!value) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return '';
};

export const validateEmail = value => {
    if (!value) return 'Email is required';
    // Проста email-перевірка
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) return 'Invalid email';
    return '';
};

export const validateName = value => {
    if (!value) return 'Name is required';
    if (value.length < 3) return 'Name must be at least 3 characters';
    return '';
};
