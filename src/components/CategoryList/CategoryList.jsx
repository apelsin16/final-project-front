import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './CategoryList.module.css';
import CategoryListItem from './CategoryListItem';
import { fetchCategories, fetchRecipesByCategory, setSelectedCategory } from '../../features/categories/categoriesSlice.js';

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

// Мапінг категорій з API на локальні зображення
const categoryImageMap = {
  'Beef': beefImg,
  'Breakfast': breakfastImg,
  'Dessert': dessertsImg,
  'Lamb': lambImg,
  'Goat': goatImg,
  'Miscellaneous': miscellaneousImg,
  'Pasta': pastaImg,
  'Pork': porkImg,
  'Seafood': seafoodImg,
  'Side': sideImg,
  'Starter': starterImg,
  'Vegan': veganImg,
  'Vegetarian': vegetarianImg,
  'Chicken': beefImg, // fallback для нових категорій
  'Soup': miscellaneousImg, // fallback для нових категорій
};

// Функція для мапінгу категорій з API
const mapApiCategoriesToDisplay = (apiCategories, screenType) => {
  return apiCategories.map(category => ({
    id: category.id,
    name: category.name,
    image: categoryImageMap[category.name] || beefImg, // fallback зображення
    size: getCategorySize(category.name, screenType)
  }));
};

// Функція для визначення розміру категорії
const getCategorySize = (categoryName, screenType) => {
  if (screenType === 'desktop') {
    // Для десктопу деякі категорії мають великий розмір
    const largeCategories = ['Dessert', 'Lamb', 'Pork', 'Side'];
    return largeCategories.includes(categoryName) ? 'large' : 'small';
  }
  return 'small'; // На мобільному та планшеті всі категорії малі
};

// Мобільна версія - 8 категорій (fallback)
const mobileCategories = [
  { id: 'beef', name: 'Beef', image: beefImg, size: 'small' },
  { id: 'breakfast', name: 'Breakfast', image: breakfastImg, size: 'small' },
  { id: 'desserts', name: 'Desserts', image: dessertsImg, size: 'small' },
  { id: 'pasta', name: 'Pasta', image: pastaImg, size: 'small' },
  { id: 'seafood', name: 'Seafood', image: seafoodImg, size: 'small' },
  { id: 'starter', name: 'Starter', image: starterImg, size: 'small' },
  { id: 'miscellaneous', name: 'Miscellaneous', image: miscellaneousImg, size: 'small' },
  { id: 'vegan', name: 'Vegan', image: veganImg, size: 'small' }
];

// Планшетна версія - 12 категорій (fallback)
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

const CategoryList = ({ onCategorySelect, onAllCategoriesClick }) => {
  const [screenType, setScreenType] = useState('mobile');
  const dispatch = useDispatch();
  const { categories, isLoading, error } = useSelector(state => state.categories);

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

  // Завантаження категорій при монтуванні компонента
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Обробка вибору категорії
  const handleCategorySelect = async (category) => {
    try {
      dispatch(setSelectedCategory(category));
      
      // Запит на бекенд за рецептами обраної категорії
      const result = await dispatch(fetchRecipesByCategory({ 
        categoryId: category.id, // використовуємо UUID з API
        page: 1 
      })).unwrap();
      
      // Якщо запит успішний, викликаємо callback для переключення на Recipes
      if (onCategorySelect) {
        onCategorySelect(category);
      }
    } catch (error) {
      // Помилка буде оброблена в Redux slice і показана через iziToast
      console.error('Error fetching recipes:', error);
    }
  };

  const handleAllCategoriesClick = () => {
    if (onAllCategoriesClick) {
      onAllCategoriesClick();
    }
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

  const getCategoriesToDisplay = () => {
    if (categories.length > 0) {
      const mappedCategories = mapApiCategoriesToDisplay(categories, screenType);
      return mappedCategories.slice(0, screenType === 'mobile' ? 8 : 11);
    }
    // Fallback on mock data
    return screenType === 'mobile' ? mobileCategories : 
           screenType === 'tablet' ? tabletCategories : desktopCategories;
  };

  const categoriesToDisplay = getCategoriesToDisplay();

  // Show loading
  if (isLoading) {
    return (
      <div className={styles.categoryList}>
        <div className={styles.loading}>Loading categories...</div>
      </div>
    );
  }

  // Мобільна версія
  if (screenType === 'mobile') {
    return (
      <div className={styles.categoryList}>
        <div className={styles.mobileContent}>
          {categoriesToDisplay.map((category) => (
            <CategoryListItem
              key={category.id}
              category={category}
              onCategorySelect={handleCategorySelect}
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
            {categoriesToDisplay.map((category) => (
              <CategoryListItem
                key={category.id}
                category={category}
                onCategorySelect={handleCategorySelect}
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
            category={categoriesToDisplay[0]}
            onCategorySelect={handleCategorySelect}
          />
          <CategoryListItem
            category={categoriesToDisplay[1]}
            onCategorySelect={handleCategorySelect}
          />
          <CategoryListItem
            category={categoriesToDisplay[2]}
            onCategorySelect={handleCategorySelect}
          />
        </div>
        <div className={styles.row}>
          <CategoryListItem
            category={categoriesToDisplay[3]}
            onCategorySelect={handleCategorySelect}
          />
          <CategoryListItem
            category={categoriesToDisplay[4]}
            onCategorySelect={handleCategorySelect}
          />
          <CategoryListItem
            category={categoriesToDisplay[5]}
            onCategorySelect={handleCategorySelect}
          />
        </div>
        <div className={styles.row}>
          <CategoryListItem
            category={categoriesToDisplay[6]}
            onCategorySelect={handleCategorySelect}
          />
          <CategoryListItem
            category={categoriesToDisplay[7]}
            onCategorySelect={handleCategorySelect}
          />
          <CategoryListItem
            category={categoriesToDisplay[8]}
            onCategorySelect={handleCategorySelect}
          />
        </div>
        <div className={styles.row}>
          <CategoryListItem
            category={categoriesToDisplay[9]}
            onCategorySelect={handleCategorySelect}
          />
          <CategoryListItem
            category={categoriesToDisplay[10]}
            onCategorySelect={handleCategorySelect}
          />
          <AllCategoriesButton />
        </div>
      </div>
    </div>
  );
};

export default CategoryList; 