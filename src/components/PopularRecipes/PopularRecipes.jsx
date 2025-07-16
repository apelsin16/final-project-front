import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getPopularRecipes } from "../../services/recipes";
import styles from "./PopularRecipes.module.css";

const PopularRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPopular = async () => {
            try {
                const popularRecipes = await getPopularRecipes();
                console.log(popularRecipes)
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
                {recipes.map((recipe) => (
                    <li key={recipe.id} className={styles.item}>
                        <img
                            src={recipe.thumb || "https://via.placeholder.com/300x200?text=No+Image"}
                            alt={recipe.title}
                            className={styles.image}
                        />
                        <div>
                            <p className={styles.title}>{recipe.title}</p>
                            <p className={styles.category}>{recipe.category?.name || "Unknown Category"}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default PopularRecipes;
