import styles from './RecipePagination.module.css';

const RecipePagination = ({ currentPage, totalPages, onPageChange, className }) => {
    if (totalPages <= 1) {
        return null;
    }

    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            // Якщо всього сторінок мало, показуємо всі
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Завжди показуємо першу сторінку
            pages.push(1);

            if (currentPage <= 3) {
                // Якщо поточна сторінка близько до початку
                for (let i = 2; i <= Math.min(4, totalPages - 1); i++) {
                    pages.push(i);
                }
                if (totalPages > 4) {
                    pages.push('...');
                }
                if (totalPages > 1) {
                    pages.push(totalPages);
                }
            } else if (currentPage >= totalPages - 2) {
                // Якщо поточна сторінка близько до кінця
                if (totalPages > 4) {
                    pages.push('...');
                }
                for (let i = Math.max(2, totalPages - 3); i <= totalPages - 1; i++) {
                    pages.push(i);
                }
                if (totalPages > 1) {
                    pages.push(totalPages);
                }
            } else {
                // Якщо поточна сторінка в середині
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }

        // Видаляємо дублікати, зберігаючи порядок
        const uniquePages = [];
        const seen = new Set();

        for (const page of pages) {
            if (!seen.has(page)) {
                seen.add(page);
                uniquePages.push(page);
            }
        }

        return uniquePages;
    };

    const pages = getPageNumbers();

    const canGoPrevious = currentPage > 1;
    const canGoNext = currentPage < totalPages;

    return (
        <div className={`${styles.recipePagination} ${className}`}>
            {/* Previous button */}
            {canGoPrevious && (
                <button
                    className={styles.paginationButton}
                    onClick={() => onPageChange(currentPage - 1)}
                    title="Previous page"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                            d="M10 12L6 8L10 4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            )}

            {/* Page numbers */}
            {pages.map((page, index) =>
                page === '...' ? (
                    <span key={`dots-${index}`} className={styles.paginationDots}>
                        ...
                    </span>
                ) : (
                    <button
                        key={`page-${page}`}
                        className={`${styles.paginationButton} ${
                            page === currentPage ? styles.active : ''
                        }`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                )
            )}

            {/* Next button */}
            {canGoNext && (
                <button
                    className={styles.paginationButton}
                    onClick={() => onPageChange(currentPage + 1)}
                    title="Next page"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                            d="M6 12L10 8L6 4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default RecipePagination;
