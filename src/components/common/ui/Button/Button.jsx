import styles from './Button.module.css';
import clsx from 'clsx';

/**
 * Універсальний компонент кнопки
 *
 * @param {Object} props
 * @param {'primary' | 'white'} props.variant - Варіант стилю кнопки
 * @param {'small' | 'large'} props.size - Розмір кнопки
 * @param {boolean} props.disabled - Чи вимкнена кнопка (автоматично стає сірою)
 * @param {boolean} props.fullWidth - Чи займає кнопка всю ширину контейнера
 * @param {function} props.onClick - Обробник кліку
 * @param {React.ReactNode} props.children - Вміст кнопки
 * @param {string} props.className - Додаткові CSS класи
 * @param {Object} props.props - Інші пропси для передачі в button елемент
 *
 * @example
 * // Чорна кнопка (основна)
 * <Button variant="primary" onClick={handleClick}>
 *   SIGN IN
 * </Button>
 *
 * @example
 * // Біла кнопка
 * <Button variant="white">
 *   ADD RECIPE
 * </Button>
 *
 * @example
 * // Сіра кнопка (вимкнена)
 * <Button variant="primary" disabled>
 *   PUBLISH
 * </Button>
 */
const Button = ({
    variant = 'primary',
    size = 'large',
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
