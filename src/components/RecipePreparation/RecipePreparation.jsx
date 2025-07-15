import React, { useState } from "react";
import styles from "./RecipePreparation.module.css";

const RecipePreparation = ({ preparation }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const handleToggleFavorite = () => {
        // Пока просто меняем состояние
        setIsFavorite((prev) => !prev);
    };

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>Приготовление</h3>
            <p className={styles.text}>
                {preparation || "Описание приготовления будет здесь..."}
            </p>
            <button className={styles.button} onClick={handleToggleFavorite}>
                {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </button>
        </div>
    );
};

export default RecipePreparation;
