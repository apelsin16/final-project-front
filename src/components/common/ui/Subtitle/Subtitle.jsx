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
 * @param {'small' | 'medium' | 'large'} props.size - Розмір підзаголовка
 * @param {'left' | 'center'} props.align - Вирівнювання тексту (по замовчуванню 'left')
 *
 * @example
 * <Subtitle as="h2" align="center">Centered Title</Subtitle>
 */
const Subtitle = ({
    children,
    className,
    as: Component = 'h2',
    color = 'dark',
    size = 'medium',
    align = 'left',
    ...props
}) => {
    const subtitleClasses = clsx(styles.subtitle, styles[color], styles[size], className, {
        [styles.centered]: align === 'center',
        [styles.left]: align === 'left',
    });

    return (
        <Component className={subtitleClasses} {...props}>
            {children}
        </Component>
    );
};

export default Subtitle;
