import { Link } from 'react-router-dom';
import styles from './PathInfo.module.css';
import clsx from 'clsx';

/**
 * Универсальный компонент для отображения навигационных хлебных крошек
 * Показывает ссылку на HOME и название текущей страницы
 *
 * @param {Object} props
 * @param {string} props.currentPage - Название текущей страницы
 * @param {string} props.homeLink - Ссылка на главную страницу (по умолчанию "/")
 * @param {string} props.homeText - Текст ссылки на главную (по умолчанию "HOME")
 * @param {string} props.separator - Разделитель между элементами (по умолчанию "/")
 * @param {string} props.className - Дополнительные CSS классы
 * @param {boolean} props.withLink - Делать ли HOME кликабельной ссылкой (по умолчанию true)
 *
 * @example
 * // Основное использование
 * <PathInfo currentPage="Profile" />
 *
 * @example
 * // Кастомная настройка
 * <PathInfo
 *   currentPage="Add Recipe"
 *   homeText="Main"
 *   homeLink="/dashboard"
 *   separator=">"
 * />
 */
const PathInfo = ({
    currentPage,
    homeLink = '/',
    homeText = 'HOME',
    separator = '/',
    className,
    withLink = true,
    ...props
}) => {
    const pathClasses = clsx(styles.pathInfo, className);

    return (
        <nav className={pathClasses} aria-label='Breadcrumb' {...props}>
            <ol className={styles.breadcrumbList}>
                <li className={styles.breadcrumbItem}>
                    {withLink ? (
                        <Link
                            to={homeLink}
                            className={clsx(styles.homeLink, styles.link)}
                            aria-label={`Go to ${homeText}`}>
                            {homeText}
                        </Link>
                    ) : (
                        <span className={styles.homeText}>{homeText}</span>
                    )}
                </li>

                <li className={styles.separator} aria-hidden='true'>
                    {separator}
                </li>

                <li className={styles.breadcrumbItem}>
                    <span className={styles.currentPage} aria-current='page'>
                        {currentPage}
                    </span>
                </li>
            </ol>
        </nav>
    );
};

export default PathInfo;
