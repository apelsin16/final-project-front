import React from "react";
import styles from "./RecipeMainInfo.module.css";

const RecipeMainInfo = ({ recipe }) => {
    if (!recipe) return null;

    const {
        title = "Название блюда",
        category = "Категория",
        description = "Описание рецепта...",
        preview = "https://via.placeholder.com/300x200?text=Image",
        author = { name: "Автор рецепта" },
    } = recipe;

    return (
        <div className={styles.wrapper}>
            <img src={preview} alt={title} className={styles.image} />
            <div className={styles.info}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.category}>{category}</p>
                <p className={styles.description}>{description}</p>
                <button className={styles.authorButton}>Автор: {author.name}</button>
            </div>
        </div>
    );
};

export default RecipeMainInfo;
