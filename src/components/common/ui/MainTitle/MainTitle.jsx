import styles from './MainTitle.module.css';
import clsx from 'clsx';

/**
 * Універсальний компонент заголовка для використання на різних сторінках
 * Адаптивный для всех устройств с правильной типографикой
 *
 * @param {Object} props
 * @param {string} props.children - Текст заголовка
 * @param {string} props.className - Дополнительные CSS классы
 * @param {'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'} props.as - HTML тег для семантики
 * @param {string} props.color - Цвет текста ('white' | 'dark')
 * @param {boolean} props.centered - Центрировать текст (по умолчанию true)
 *
 * @example
 * // Hero заголовок
 * <MainTitle color="white">
 *   Improve Your Culinary Talents
 * </MainTitle>
 *
 * @example
 * // Темный заголовок
 * <MainTitle color="dark" as="h2">
 *   Our Best Recipes
 * </MainTitle>
 *
 */
const MainTitle = ({
    children,
    className,
    as: Component = 'h2',
    color = 'black',
    centered = false,
    ...props
}) => {
    const titleClasses = clsx(
        styles.mainTitle,
        styles[color],
        {
            [styles.centered]: centered,
        },
        className
    );

    return (
        <Component className={titleClasses} {...props}>
            {children}
        </Component>
    );
};

export default MainTitle;
