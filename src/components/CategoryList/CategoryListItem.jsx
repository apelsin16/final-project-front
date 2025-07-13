import React from 'react';
import styles from './CategoryListItem.module.css';
import IconButton from '../common/ui/IconButton/IconButton';

const CategoryListItem = ({ name, id, image, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <div 
      className={styles.category}
      style={{ '--bg-image': `url(${image})` }}
      onClick={handleClick}
    >
        <div className={styles.buttonBlock}>
            <div className={styles.categoryName} onClick={handleClick}>{name}</div>
            <IconButton icon='arrow' variant="transparent" ></IconButton>
        </div>
    </div>
  );
};

export default CategoryListItem; 