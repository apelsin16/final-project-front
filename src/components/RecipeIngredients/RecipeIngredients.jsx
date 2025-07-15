import React from "react";
import styles from "./RecipeIngredients.module.css";

const RecipeIngredients = ({ ingredients }) => {
    if (!ingredients?.length) {
        return <p className={styles.empty}>Ингредиенты отсутствуют</p>;
    }

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>Ингредиенты</h3>
            <ul className={styles.list}>
                {ingredients.map((item, index) => (
                    <li key={index} className={styles.item}>
                        <img
                            src={item.image || "https://via.placeholder.com/40"}
                            alt={item.name}
                            className={styles.image}
                        />
                        <span className={styles.name}>{item.name}</span>
                        <span className={styles.amount}>{item.amount}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeIngredients;
