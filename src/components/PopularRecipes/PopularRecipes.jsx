import styles from "./PopularRecipes.module.css";

// Temporary mock data
const mockPopularRecipes = [
    {
        id: 1,
        title: "Margherita Pizza",
        category: "Italian Cuisine",
        preview: "https://via.placeholder.com/300x200?text=Pizza",
    },
    {
        id: 2,
        title: "Caesar Salad",
        category: "Salads",
        preview: "https://via.placeholder.com/300x200?text=Salad",
    },
    {
        id: 3,
        title: "Tom Yum",
        category: "Asian Cuisine",
        preview: "https://via.placeholder.com/300x200?text=Tom+Yum",
    },
];

const PopularRecipes = () => {
    return (
        <section className={styles.wrapper}>
            <h3 className={styles.heading}>Popular Recipes</h3>
            <ul className={styles.list}>
                {mockPopularRecipes.map((recipe) => (
                    <li key={recipe.id} className={styles.item}>
                        <img src={recipe.preview} alt={recipe.title} className={styles.image} />
                        <div>
                            <p className={styles.title}>{recipe.title}</p>
                            <p className={styles.category}>{recipe.category}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default PopularRecipes;
