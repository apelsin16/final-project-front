import styles from './CategoryListItem.module.css';

const CategoryListItem = ({ category, large, onCategorySelect }) => {
    const { id, name, image } = category;

    const size = large ? 'large' : 'small';

    const handleCategoryClick = () => {
        if (onCategorySelect) {
            onCategorySelect(category);
        }
    };

    const handleArrowClick = e => {
        e.stopPropagation();
        if (onCategorySelect) {
            onCategorySelect(category);
        }
    };

    return (
        <div
            className={`${styles.categoryItem} ${styles[size]}`}
            style={{ backgroundImage: `url(${image})` }}
            onClick={handleCategoryClick}
            role="button"
            tabIndex={0}
            onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCategoryClick();
                }
            }}
            aria-label={`Browse ${name} recipes`}
        >
            <div className={styles.overlay}></div>
            <div className={styles.buttons}>
                <button
                    className={styles.categoryButton}
                    onClick={handleCategoryClick}
                    aria-label={`View ${name} category`}
                >
                    <span className={styles.categoryName}>{name}</span>
                </button>
                <button
                    className={styles.arrowButton}
                    onClick={handleArrowClick}
                    aria-label={`Quick view ${name} recipes`}
                    title={`Quick view ${name} recipes`}
                >
                    <svg className={styles.arrowIcon} width="18" height="18">
                        <use href="/sprite.svg#arrow" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default CategoryListItem;
