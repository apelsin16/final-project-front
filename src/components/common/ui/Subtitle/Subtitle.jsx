import styles from './Subtitle.module.css';
import clsx from 'clsx';

/**
 * Универсальный компонент подзаголовка для использования на разных страницах
 * Меньше чем MainTitle, но больше обычного текста
 *
 * @param {Object} props
 * @param {string} props.children - Текст подзаголовка
 * @param {string} props.className - Дополнительные CSS классы
 * @param {'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'} props.as - HTML тег для семантики
 * @param {string} props.color - Цвет текста ('dark' | 'light')
 * @param {boolean} props.centered - Центрировать текст (по умолчанию false)
 * @param {'small' | 'medium' | 'large'} props.size - Размер подзаголовка
 *
 * @example
 * // Заголовок страницы
 * <Subtitle as="h1">Add Recipe</Subtitle>
 *
 * @example
 * // Заголовок секции
 * <Subtitle as="h2" centered>Profile</Subtitle>
 *
 * @example
 * // Маленький подзаголовок
 * <Subtitle as="h3" size="small">Categories</Subtitle>
 */
const Subtitle = ({
    children,
    className,
    as: Component = 'h2',
    color = 'dark',
    centered = false,
    size = 'medium',
    ...props
}) => {
    const subtitleClasses = clsx(
        styles.subtitle,
        styles[color],
        styles[size],
        {
            [styles.centered]: centered,
        },
        className
    );

    return (
        <Component className={subtitleClasses} {...props}>
            {children}
        </Component>
    );
};

export default Subtitle;
