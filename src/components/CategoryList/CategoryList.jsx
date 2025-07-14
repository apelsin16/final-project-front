import styles from './CategoryList.module.css';
import CategoryListItem from './CategoryListItem';

// Імпорт зображень категорій відповідно до Figma дизайну
import beefImg from '../../assets/images/beef.jpg';
import breakfastImg from '../../assets/images/breackfast.jpg';
import dessertsImg from '../../assets/images/desserts.jpg';
import lambImg from '../../assets/images/lamb.jpg';
import goatImg from '../../assets/images/goat.jpg';
import miscellaneousImg from '../../assets/images/miscellaneous.jpg';
import pastaImg from '../../assets/images/pasta.jpg';
import porkImg from '../../assets/images/pork.jpg';
import seafoodImg from '../../assets/images/seafood.jpg';
import sideImg from '../../assets/images/side.jpg';
import starterImg from '../../assets/images/starter.jpg';

// Мобільна версія - 8 категорій
const mobileCategories = [
  { id: 'beef', name: 'Beef', image: beefImg, size: 'small' },
  { id: 'breakfast', name: 'Breakfast', image: breakfastImg, size: 'small' },
  { id: 'desserts', name: 'Desserts', image: dessertsImg, size: 'small' },
  { id: 'pasta', name: 'Pasta', image: pastaImg, size: 'small' },
  { id: 'seafood', name: 'Seafood', image: seafoodImg, size: 'small' },
  { id: 'starter', name: 'Starter', image: starterImg, size: 'small' },
  { id: 'miscellaneous', name: 'Miscellaneous', image: miscellaneousImg, size: 'small' },
  { id: 'pork', name: 'Pork', image: porkImg, size: 'small' }
];

// Планшетна і десктопна версії - 11 категорій
const desktopCategories = [
  { id: 'beef', name: 'Beef', image: beefImg, size: 'small' },
  { id: 'breakfast', name: 'Breakfast', image: breakfastImg, size: 'small' },
  { id: 'desserts', name: 'Desserts', image: dessertsImg, size: 'large' },
  { id: 'lamb', name: 'Lamb', image: lambImg, size: 'large' },
  { id: 'goat', name: 'Goat', image: goatImg, size: 'small' },
  { id: 'miscellaneous', name: 'Miscellaneous', image: miscellaneousImg, size: 'small' },
  { id: 'pasta', name: 'Pasta', image: pastaImg, size: 'small' },
  { id: 'pork', name: 'Pork', image: porkImg, size: 'large' },
  { id: 'seafood', name: 'Seafood', image: seafoodImg, size: 'small' },
  { id: 'side', name: 'Side', image: sideImg, size: 'large' },
  { id: 'starter', name: 'Starter', image: starterImg, size: 'small' }
];

const CategoryList = () => {
  const handleAllCategoriesClick = () => {
    console.log('All categories clicked');
    // TODO: Додати навігацію до сторінки з всіма категоріями
    // Наприклад: navigate('/categories');
  };

  const AllCategoriesButton = () => (
    <div 
      className={`${styles.allCategoriesButton} ${styles.small}`}
      onClick={handleAllCategoriesClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleAllCategoriesClick();
        }
      }}
      aria-label="View all recipe categories"
    >
      <span className={styles.allCategoriesText}>All categories</span>
    </div>
  );

  return (
    <div className={styles.categoryList}>
      {/* Мобільна версія - 8 категорій в стовпець */}
      <div className={styles.mobileContent}>
        {mobileCategories.map((category) => (
          <CategoryListItem key={category.id} category={category} />
        ))}
        <AllCategoriesButton />
      </div>

      {/* Планшетна версія - 11 категорій в 2-колонкову сітку */}
      <div className={styles.tabletContent}>
        <div className={styles.tabletGrid}>
          {desktopCategories.map((category) => (
            <CategoryListItem key={category.id} category={category} />
          ))}
          <AllCategoriesButton />
        </div>
      </div>

      {/* Десктопна версія - 11 категорій в сітку відповідно до Figma */}
      <div className={styles.desktopContent}>
        <div className={styles.content}>
          {/* Перший ряд - Beef, Breakfast, Desserts */}
          <div className={styles.row}>
            <CategoryListItem category={desktopCategories[0]} /> {/* Beef - small */}
            <CategoryListItem category={desktopCategories[1]} /> {/* Breakfast - small */}
            <CategoryListItem category={desktopCategories[2]} /> {/* Desserts - large */}
          </div>

          {/* Другий ряд - Lamb, Goat, Miscellaneous */}
          <div className={styles.row}>
            <CategoryListItem category={desktopCategories[3]} /> {/* Lamb - large */}
            <CategoryListItem category={desktopCategories[4]} /> {/* Goat - small */}
            <CategoryListItem category={desktopCategories[5]} /> {/* Miscellaneous - small */}
          </div>

          {/* Третій ряд - Pasta, Pork, Seafood */}
          <div className={styles.row}>
            <CategoryListItem category={desktopCategories[6]} /> {/* Pasta - small */}
            <CategoryListItem category={desktopCategories[7]} /> {/* Pork - large */}
            <CategoryListItem category={desktopCategories[8]} /> {/* Seafood - small */}
          </div>

          {/* Четвертий ряд - Side, Starter, All categories */}
          <div className={styles.row}>
            <CategoryListItem category={desktopCategories[9]} /> {/* Side - large */}
            <CategoryListItem category={desktopCategories[10]} /> {/* Starter - small */}
            <AllCategoriesButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList; 