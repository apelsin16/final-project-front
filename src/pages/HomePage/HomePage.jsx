import { useState } from 'react';
import Hero from '../../components/Hero/Hero';
import Categories from '../../components/Categories/Categories';
import Recipes from '../../components/Recipes/Recipes';
import Testimonials from '../../components/Testimonials/Testimonials';

function HomePage() {
    const [showRecipes, setShowRecipes] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setShowRecipes(true);
    };

    const handleBackToCategories = () => {
        setShowRecipes(false);
        setSelectedCategory(null);
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
