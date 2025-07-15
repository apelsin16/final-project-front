import styles from "./PopularRecipes.module.css";

// Временные мок-данные
const mockPopularRecipes = [
    {
        id: 1,
        title: "Пицца Маргарита",
        category: "Итальянская кухня",
        preview: "https://via.placeholder.com/300x200?text=Pizza",
    },
    {
        id: 2,
        title: "Салат Цезарь",
        category: "Салаты",
        preview: "https://via.placeholder.com/300x200?text=Salad",
    },
    {
        id: 3,
        title: "Том Ям",
        category: "Азиатская кухня",
        preview: "https://via.placeholder.com/300x200?text=Tom+Yum",
    },
];

const PopularRecipes = () => {
    return (
        <section className={styles.wrapper}>
            <h3 className={styles.heading}>Популярные рецепты</h3>
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
