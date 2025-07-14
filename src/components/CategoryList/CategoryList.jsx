import { useState, useEffect } from 'react';
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
import veganImg from '../../assets/images/vegan.jpg';
import vegetarianImg from '../../assets/images/vegetarian.jpg';

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

// Планшетна версія - 11 категорій
const tabletCategories = [
  { id: 'beef', name: 'Beef', image: beefImg, size: 'small' },
  { id: 'breakfast', name: 'Breakfast', image: breakfastImg, size: 'small' },
  { id: 'desserts', name: 'Desserts', image: dessertsImg, size: 'large' },
  { id: 'lamb', name: 'Lamb', image: lambImg, size: 'small' },
  { id: 'goat', name: 'Goat', image: goatImg, size: 'small' },
  { id: 'miscellaneous', name: 'Miscellaneous', image: miscellaneousImg, size: 'small' },
  { id: 'pasta', name: 'Pasta', image: pastaImg, size: 'small' },
  { id: 'pork', name: 'Pork', image: porkImg, size: 'large' },
  { id: 'seafood', name: 'Seafood', image: seafoodImg, size: 'small' },
  { id: 'side', name: 'Side', image: sideImg, size: 'small' },
  { id: 'starter', name: 'Starter', image: starterImg, size: 'small' }
];

// Десктопна версія - 11 категорій
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

const CategoryList = ({ onCategorySelect }) => {
  const [screenType, setScreenType] = useState('mobile');

  // Визначення типу екрана
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1440) {
        setScreenType('desktop');
      } else if (window.innerWidth >= 768) {
        setScreenType('tablet');
      } else {
        setScreenType('mobile');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAllCategoriesClick = () => {
    console.log('All categories clicked');
    // TODO: Додати навігацію до сторінки з всіма категоріями
  };

  const AllCategoriesButton = () => (
    <div 
      className={styles.allCategoriesButton}
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

  // Мобільна версія
  if (screenType === 'mobile') {
    return (
      <div className={styles.categoryList}>
        <div className={styles.mobileContent}>
          {mobileCategories.map((category) => (
            <CategoryListItem
              key={category.id}
              category={category}
              onCategorySelect={onCategorySelect}
            />
          ))}
          <AllCategoriesButton />
        </div>
      </div>
    );
  }

  // Планшетна версія
  if (screenType === 'tablet') {
    return (
      <div className={styles.categoryList}>
        <div className={styles.tabletContent}>
          <div className={styles.tabletGrid}>
            {tabletCategories.map((category) => (
              <CategoryListItem
                key={category.id}
                category={category}
                onCategorySelect={onCategorySelect}
              />
            ))}
            <AllCategoriesButton />
          </div>
        </div>
      </div>
    );
  }

  // Десктопна версія
  return (
    <div className={styles.categoryList}>
      <div className={styles.desktopContent}>
        <div className={styles.row}>
          <CategoryListItem
            category={desktopCategories[0]}
            onCategorySelect={onCategorySelect}
          />
          <CategoryListItem
            category={desktopCategories[1]}
            onCategorySelect={onCategorySelect}
          />
          <CategoryListItem
            category={desktopCategories[2]}
            onCategorySelect={onCategorySelect}
          />
        </div>
        <div className={styles.row}>
          <CategoryListItem
            category={desktopCategories[3]}
            onCategorySelect={onCategorySelect}
          />
          <CategoryListItem
            category={desktopCategories[4]}
            onCategorySelect={onCategorySelect}
          />
          <CategoryListItem
            category={desktopCategories[5]}
            onCategorySelect={onCategorySelect}
          />
        </div>
        <div className={styles.row}>
          <CategoryListItem
            category={desktopCategories[6]}
            onCategorySelect={onCategorySelect}
          />
          <CategoryListItem
            category={desktopCategories[7]}
            onCategorySelect={onCategorySelect}
          />
          <CategoryListItem
            category={desktopCategories[8]}
            onCategorySelect={onCategorySelect}
          />
        </div>
        <div className={styles.row}>
          <CategoryListItem
            category={desktopCategories[9]}
            onCategorySelect={onCategorySelect}
          />
          <CategoryListItem
            category={desktopCategories[10]}
            onCategorySelect={onCategorySelect}
          />
          <AllCategoriesButton />
        </div>
      </div>
    </div>
  );
};

export default CategoryList; 