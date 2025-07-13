import React from 'react';
import styles from './CategoryList.module.css';
import CategoryListItem from './CategoryListItem';
import DessertsImage from '../../assets/images/desserts.jpg';
import BeefImage from '../../assets/images/beef.jpg';

const CategoryList = () => {
  const categories = [{
    image: DessertsImage,
    name: 'Desserts',
    id: 1,
  }, {
    image: BeefImage,
    name: 'Beef',
    id: 2,
  }];

  function onCategoryClick(category) {
    console.log(category);
  }

  return (
    <div className={styles.categoryList}>
      {categories.map((cat, index) => (
        <CategoryListItem
          key={cat.id}
          id={cat.id}
          name={cat.name}
          image={cat.image}
          onClick={onCategoryClick}
        />
      ))}
    </div>
  );
};

export default CategoryList; 