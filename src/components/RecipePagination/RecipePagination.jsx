import styles from './RecipePagination.module.css';

const RecipePagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) {
        return null;
    }

    const pages = [];
    const maxVisiblePages = 5;

    // Функція для генерації видимих сторінок
    const getVisiblePages = () => {
        const pages = [];
        const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const visiblePages = getVisiblePages();

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className={styles.pagination}>
            {visiblePages[0] > 1 && (
                <>
                    <button
                        className={styles.paginationButton}
                        onClick={() => onPageChange(1)}
                    >
                        1
                    </button>
                    {visiblePages[0] > 2 && (
                        <span className={styles.ellipsis}>...</span>
                    )}
                </>
            )}

            {visiblePages.map(page => (
                <button
                    key={page}
                    className={`${styles.paginationButton} ${page === currentPage ? styles.active : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            {visiblePages[visiblePages.length - 1] < totalPages && (
                <>
                    {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                        <span className={styles.ellipsis}>...</span>
                    )}
                    <button
                        className={styles.paginationButton}
                        onClick={() => onPageChange(totalPages)}
                    >
                        {totalPages}
                    </button>
                </>
            )}
        </div>
    );
};

export default RecipePagination; 