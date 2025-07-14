import React from 'react';
import styles from './Categories.module.css';
import CategoryList from '../CategoryList/CategoryList';
import MainTitle from '../common/ui/MainTitle/MainTitle';
import Subtitle from '../common/ui/Subtitle/Subtitle';

const Categories = ({ onCategorySelect }) => {
  return (
    <section className={styles.categories}>
      <div className={styles.categoriesTitleBlock}>
        <MainTitle color="dark" as="h2">
          Categories
        </MainTitle>
        <Subtitle color="dark" align="center" as="p">
          Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine taste, style and the warm atmosphere of the kitchen.
        </Subtitle>
      </div>
      <CategoryList onCategorySelect={onCategorySelect} />
    </section>
  );
};

export default Categories; 