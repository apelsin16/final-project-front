import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './HomePage.module.css';
import Categories from '../../components/Categories/Categories';
import Recipes from '../../components/Recipes/Recipes';
import Testimonials from '../../components/Testimonials/Testimonials';

function HomePage() {
    const [currentView, setCurrentView] = useState('categories'); // 'categories', 'recipes', 'allRecipes'
    const { selectedCategory } = useSelector(state => state.categories);

    const handleCategorySelect = category => {
        setCurrentView('recipes');
    };

    const handleAllCategoriesClick = () => {
        setCurrentView('allRecipes');
    };

    const handleBackToCategories = () => {
        setCurrentView('categories');
    };

    const renderContent = () => {
        switch (currentView) {
            case 'recipes':
                return <Recipes category={selectedCategory} onBack={handleBackToCategories} />;
            case 'allRecipes':
                return <Recipes onBack={handleBackToCategories} />;
            default:
                return (
                    <Categories
                        onCategorySelect={handleCategorySelect}
                        onAllCategoriesClick={handleAllCategoriesClick}
                    />
                );
        }
    };

    return (
        <div className={`${styles.homePage} ${styles.categories}`}>
            {renderContent()}
            <Testimonials />
        </div>
    );
}

export default HomePage;
