import clsx from 'clsx';
import styles from './Typography.module.css';

/**
 * Компонент для демонстрації типографії проекту
 * Показує всі доступні шрифти, розміри та ваги
 */
const Typography = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.hero}>Foodies</h1>
            <h2 className={styles.title}>Mulish Font Examples</h2>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Font Weights</h3>

                <p className={styles.medium}>Medium 500: The quick brown fox jumps over the lazy dog</p>

                <p className={styles.bold}>Bold 700: The quick brown fox jumps over the lazy dog</p>

                <p className={styles.extraBold}>
                    Extra Bold 800: The quick brown fox jumps over the lazy dog
                </p>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Font Sizes</h3>

                <p className={styles.small}>Small (12px): Lorem ipsum dolor sit amet</p>
                <p className={styles.mediumMobile}>Medium Mobile (14px): Lorem ipsum dolor sit amet</p>
                <p className={styles.mediumText}>Medium (16px): Lorem ipsum dolor sit amet</p>
                <p className={styles.large}>Large (18px): Lorem ipsum dolor sit amet</p>
                <p className={clsx(styles.titleSize, styles.titleSizeMobile)}>
                    Title (24px): Lorem ipsum dolor sit amet
                </p>
            </div>
        </div>
    );
};

export default Typography;
