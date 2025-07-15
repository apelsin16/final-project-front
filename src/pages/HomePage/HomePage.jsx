import { useState } from 'react';
import { useSelector } from 'react-redux';
import Hero from '../../components/Hero/Hero';
import Categories from '../../components/Categories/Categories';
import Recipes from '../../components/Recipes/Recipes';
import Testimonials from '../../components/Testimonials/Testimonials';

function HomePage() {
    const [showRecipes, setShowRecipes] = useState(false);
    const { selectedCategory } = useSelector(state => state.categories);

    const handleCategorySelect = (category) => {
        setShowRecipes(true);
    };

    const handleBackToCategories = () => {
        setShowRecipes(false);
    };

    return (
        <div className='App'>
            <Hero />
            {!showRecipes ? (
                <Categories onCategorySelect={handleCategorySelect} />
            ) : (
                <Recipes 
                    category={selectedCategory} 
                    onBack={handleBackToCategories}
                />
            )}
            <Testimonials />
        </div>
    );
}

export default HomePage;
