import styles from './Categories.module.css';
import CategoryList from '../CategoryList/CategoryList';
import MainTitle from '../common/ui/MainTitle/MainTitle';
import Subtitle from '../common/ui/Subtitle/Subtitle';

const Categories = ({ onCategorySelect }) => {
    return (
        <section className={styles.categories}>
            <div className={styles.header}>
                <MainTitle>CATEGORIES</MainTitle>
                <Subtitle limitWidth>
                    Discover a limitless world of culinary possibilities and
                    enjoy exquisite recipes that combine taste, style and the
                    warm atmosphere of the kitchen.
                </Subtitle>
            </div>
            <CategoryList onCategorySelect={onCategorySelect} />
        </section>
    );
};

export default Categories;
