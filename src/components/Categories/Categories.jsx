import React from 'react';
import styles from './Categories.module.css';
import CategoryList from '../CategoryList/CategoryList';

const Categories = () => {
  return (
    <section className={styles.categories}>
      <div className={styles.categoriesTitleBlock}>
        <h1 className={styles.categoriesTitle}>Categories</h1>
        <h3 className={styles.categoriesSubTitle}>Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine taste, style and the warm atmosphere of the kitchen.</h3>
      </div>
      <CategoryList  />
    </section>
  );
};

export default Categories; 