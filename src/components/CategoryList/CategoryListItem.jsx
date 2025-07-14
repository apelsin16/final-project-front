import styles from './CategoryListItem.module.css';

const CategoryListItem = ({ category }) => {
  const { id, name, image, size } = category;

  const handleCategoryClick = () => {
    console.log(`Selected category: ${name} (${id})`);
    // TODO: Додати навігацію до сторінки категорії
    // Наприклад: navigate(`/categories/${id}`);
  };

  const handleArrowClick = (e) => {
    e.stopPropagation();
    console.log(`Quick view for category: ${name} (${id})`);
    // TODO: Додати швидкий перегляд або додаткову функціональність
    // Наприклад: відкрити модальне вікно з рецептами категорії
  };

  return (
    <div 
      className={`${styles.categoryItem} ${styles[size]}`}
      style={{ backgroundImage: `url(${image})` }}
      onClick={handleCategoryClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
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
          <svg 
            className={styles.arrowIcon}
            width="18" 
            height="18" 
            viewBox="0 0 18 18" 
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M4.5 13.5L13.5 4.5M13.5 4.5H4.5M13.5 4.5V13.5" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CategoryListItem; 