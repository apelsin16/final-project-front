import styles from './IconButton.module.css';
import clsx from 'clsx';

// Компонент іконки з спрайту
const Icon = ({ name, size = 24 }) => (
    <svg width={size} height={size}>
        <use href={`/src/assets/sprite.svg#${name}`} />
    </svg>
);

// Доступні типи іконок
const ICONS = {
    heart: 'heart',
    arrow: 'arrow',
    delete: 'trash',
    eye: 'eye',
    eyeOff: 'eye-off',
    facebook: 'facebook',
    instagram: 'instagram',
    youtube: 'youtube',
};

/**
 * Клікабельна кнопка з іконкою
 *
 * @param {Object} props
 * @param {'heart' | 'arrow' | 'delete' | 'eye' | 'eyeOff' | 'facebook' | 'instagram' | 'youtube'} props.icon - Тип іконки
 * @param {'small' | 'medium' | 'large'} props.size - Розмір кнопки
 * @param {'default' | 'filled' | 'outlined'} props.variant - Варіант стилю
 * @param {boolean} props.filled - Для іконки heart - заповнена чи ні
 * @param {function} props.onClick - Обробник кліку
 * @param {boolean} props.disabled - Чи вимкнена кнопка
 * @param {string} props.className - Додаткові CSS класи
 * @param {string} props.ariaLabel - Aria-label для доступності
 *
 * @example
 * // Кнопка додавання до улюблених
 * <IconButton
 *   icon="heart"
 *   filled={isFavorite}
 *   onClick={toggleFavorite}
 *   ariaLabel="Add to favorites"
 * />
 *
 * @example
 * // Кнопка видалення
 * <IconButton
 *   icon="delete"
 *   variant="outlined"
 *   onClick={handleDelete}
 *   ariaLabel="Delete recipe"
 * />
 *
 * @example
 * // Кнопка показати/приховати пароль
 * <IconButton
 *   icon={showPassword ? "eyeOff" : "eye"}
 *   onClick={togglePasswordVisibility}
 *   ariaLabel="Toggle password visibility"
 * />
 */
const IconButton = ({
    icon,
    size = 'medium',
    variant = 'default',
    filled = false,
    onClick,
    disabled = false,
    className,
    ariaLabel,
    ...props
}) => {
    const iconName = ICONS[icon];

    if (!iconName) {
        console.warn(`Icon "${icon}" not found`);
        return null;
    }

    const buttonClasses = clsx(
        styles.iconButton,
        styles[size],
        styles[variant],
        {
            [styles.disabled]: disabled,
            [styles.filled]: filled && icon === 'heart',
        },
        className
    );

    return (
        <button
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
            {...props}>
            <Icon name={iconName} />
        </button>
    );
};

export default IconButton;
