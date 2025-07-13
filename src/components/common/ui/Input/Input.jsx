import { useState } from 'react';
import styles from './Input.module.css';
import IconButton from '../IconButton/IconButton';
import clsx from 'clsx';

/**
 * Компонент текстового поля вводу
 *
 * @param {Object} props
 * @param {'text' | 'email' | 'password'} props.type - Тип поля ввода
 * @param {string} props.value - Значение поля
 * @param {function} props.onChange - Обработчик изменения значения
 * @param {string} props.placeholder - Текст плейсхолдера
 * @param {string} props.label - Текст лейбла
 * @param {'small' | 'large'} props.size - Размер поля (48px | 56px)
 * @param {boolean} props.required - Обязательно ли поле
 * @param {boolean} props.disabled - Выключено ли поле
 * @param {string} props.error - Текст ошибки
 * @param {string} props.className - Дополнительные CSS классы
 * @param {string} props.name - Имя поля
 * @param {string} props.id - ID поля
 *
 * @example
 * // Email поле
 * <Input
 *   type="email"
 *   value={email}
 *   onChange={setEmail}
 *   placeholder="Enter your email"
 *   label="Email"
 *   size="large"
 *   required
 * />
 *
 * @example
 * // Password поле с показать/скрыть
 * <Input
 *   type="password"
 *   value={password}
 *   onChange={setPassword}
 *   placeholder="Enter your password"
 *   label="Password"
 *   size="small"
 *   required
 * />
 */
const Input = ({
    type = 'text',
    value,
    onChange,
    placeholder,
    label,
    size = 'large',
    required = false,
    disabled = false,
    error,
    className,
    name,
    id,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const inputType = type === 'password' && showPassword ? 'text' : type;
    const inputId = id || name || label?.toLowerCase().replace(/\s+/g, '-');

    const inputClasses = clsx(
        styles.input,
        styles[size],
        {
            [styles.error]: error,
            [styles.disabled]: disabled,
            [styles.withIcon]: type === 'password',
        },
        className
    );

    const wrapperClasses = clsx(styles.wrapper, {
        [styles.hasError]: error,
    });

    return (
        <div className={wrapperClasses}>
            {label && (
                <label htmlFor={inputId} className={styles.label}>
                    {label}
                    {required && <span className={styles.required}>*</span>}
                </label>
            )}

            <div className={styles.inputWrapper}>
                <input
                    id={inputId}
                    name={name}
                    type={inputType}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    className={inputClasses}
                    {...props}
                />

                {type === 'password' && (
                    <IconButton
                        icon={showPassword ? 'eyeOff' : 'eye'}
                        onClick={togglePasswordVisibility}
                        ariaLabel={showPassword ? 'Hide password' : 'Show password'}
                        className={styles.toggleButton}
                    />
                )}
            </div>

            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};

export default Input;
