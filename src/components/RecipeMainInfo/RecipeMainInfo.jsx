import React from "react";
import styles from "./RecipeMainInfo.module.css";

const RecipeMainInfo = ({ recipe }) => {
    if (!recipe) return null;

    const {
        title = "Salmon Avocado Salad",
        category = "Seafood",
        time = "40 min",
        description = "A healthy salad recipe that’s big on nutrients and flavor. Moist, pan-seared salmon is layered on top of spinach, avocado, tomatoes, and red onions, then drizzled with a homemade lemon vinaigrette.",
        preview = "https://via.placeholder.com/300x200?text=Image",
        author = { name: "Nadia", avatar: "" },
    } = recipe;

    return (
        <div className={styles.wrapper}>
            <div className={styles.imageContainer}>
                <img src={preview} alt={title} className={styles.image} />
            </div>
            <div className={styles.infoContainer}>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.tagsRow}>
                  <span className={styles.category}>{category}</span>
                  <span className={styles.time}>{time}</span>
                </div>
                <p className={styles.description}>{description}</p>
                <div className={styles.authorInfo}>
                  <img src={author.avatar} alt={author.name} className={styles.authorAvatar} />
                  <div>
                    <div className={styles.createdBy}>Created by:</div>
                    <div className={styles.authorName}>{author.name}</div>
                  </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeMainInfo;
