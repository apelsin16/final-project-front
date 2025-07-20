import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getPopularRecipes } from '../../services/recipes';
import RecipeCard from '../RecipeCard/RecipeCard';
import styles from './PopularRecipes.module.css';

const PopularRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPopular = async () => {
            try {
                const popularRecipes = await getPopularRecipes();
                setRecipes(popularRecipes);
            } catch (error) {
                toast.error(`Failed to load popular recipes. ${error?.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchPopular();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!recipes.length) return <div>No popular recipes found.</div>;

    return (
        <section className={styles.wrapper}>
            <h3 className={styles.heading}>Popular Recipes</h3>
            <ul className={styles.list}>
                {recipes.map(recipe => (
                    <li key={recipe.id} className={styles.item}>
                        <RecipeCard recipe={recipe} />
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default PopularRecipes;
