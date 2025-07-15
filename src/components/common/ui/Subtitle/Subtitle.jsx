import styles from './Subtitle.module.css';
import clsx from 'clsx';

/**
 * Універсальний компонент підзаголовка для використання на різних сторінках
 * Менше ніж MainTitle, але більше звичайного тексту
 *
 * @param {Object} props
 * @param {string} props.children - Текст підзаголовка
 * @param {string} props.className - Додаткові CSS класи
 * @param {'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'} props.as - HTML тег для семантики
 * @param {string} props.color - Колір тексту ('dark' | 'light')
 * @param {boolean} props.limitWidth - Максимальна ширина тексту
 *
 * @example
 * <Subtitle as="h2" align="center">Centered Title</Subtitle>
 */
const Subtitle = ({
    children,
    className,
    as: Component = 'h2',
    color,
    ...props
}) => {
    const subtitleClasses = clsx(
        styles.subtitle,
        className,
        styles[color],
        props.limitWidth ? styles.limitWidth : ''
    );

    return (
        <Component className={subtitleClasses} {...props}>
            {children}
        </Component>
    );
};

export default Subtitle;
