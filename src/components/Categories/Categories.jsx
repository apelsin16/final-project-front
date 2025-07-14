import styles from './Categories.module.css';
import CategoryList from '../CategoryList/CategoryList';

const Categories = () => {
  return (
    <section className={styles.categories}>
      <div className={styles.header}>
        <h2 className={styles.title}>Categories</h2>
        <p className={styles.description}>
          Discover a limitless world of culinary possibilities and enjoy exquisite 
          recipes that combine taste, style and the warm atmosphere of the kitchen.
        </p>
      </div>
      <CategoryList />
    </section>
  );
};

export default Categories; 