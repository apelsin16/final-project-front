import styles from './Button.module.css';
import clsx from 'clsx';

/**
 * Універсальний компонент кнопки
 *
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'outline'} props.variant - Варіант стилю кнопки
 * @param {'small' | 'medium' | 'large'} props.size - Розмір кнопки
 * @param {boolean} props.disabled - Чи вимкнена кнопка
 * @param {boolean} props.fullWidth - Чи займає кнопка всю ширину контейнера
 * @param {function} props.onClick - Обробник кліку
 * @param {React.ReactNode} props.children - Вміст кнопки
 * @param {string} props.className - Додаткові CSS класи
 * @param {Object} props.props - Інші пропси для передачі в button елемент
 *
 * @example
 * // Основна чорна кнопка
 * <Button variant="primary" size="medium" onClick={handleClick}>
 *   SIGN IN
 * </Button>
 *
 * @example
 * // Сіра кнопка
 * <Button variant="secondary" size="medium">
 *   SIGN IN
 * </Button>
 *
 * @example
 * // Біла кнопка з межею
 * <Button variant="outline" size="large">
 *   ADD RECIPE
 * </Button>
 */
const Button = ({
    variant = 'primary',
    size = 'medium',
    disabled = false,
    fullWidth = false,
    onClick,
    children,
    className,
    ...props
}) => {
    const buttonClasses = clsx(
        styles.button,
        styles[variant],
        styles[size],
        {
            [styles.disabled]: disabled,
            [styles.fullWidth]: fullWidth,
        },
        className
    );

    return (
        <button className={buttonClasses} disabled={disabled} onClick={onClick} {...props}>
            {children}
        </button>
    );
};

export default Button;
