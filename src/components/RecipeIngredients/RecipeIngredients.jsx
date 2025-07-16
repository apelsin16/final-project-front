import React from "react";
import styles from "./RecipeIngredients.module.css";

const RecipeIngredients = ({ ingredients }) => {
    if (!ingredients?.length) {
        return <p className={styles.empty}>No ingredients available</p>;
    }

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>INGREDIENTS</h3>
            <ul className={styles.list} aria-label="Ingredients list">
                {ingredients.map((item, index) => (
                    <li key={index} className={styles.item}>
                        <img
                            src={item.image || "https://via.placeholder.com/90"}
                            alt={item.name}
                            className={styles.image}
                        />
                        <div>
                          <div className={styles.name}>{item.name}</div>
                          <div className={styles.amount}>{item.amount}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeIngredients;
