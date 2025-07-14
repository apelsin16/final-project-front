import styles from './RecipePagination.module.css';

const RecipePagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) {
        return null;
    }

    // Генеруємо простий список сторінок для першых 3 сторінок як в Figma
    const pages = [];
    const maxPages = Math.min(3, totalPages);
    
    for (let i = 1; i <= maxPages; i++) {
        pages.push(i);
    }

    return (
        <div className={styles.recipePagination}>
            {pages.map(page => (
                <button
                    key={page}
                    className={`${styles.paginationButton} ${page === currentPage ? styles.active : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default RecipePagination; 