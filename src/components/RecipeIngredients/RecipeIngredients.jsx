import React from "react";
import styles from "./RecipeIngredients.module.css";

const RecipeIngredients = ({ ingredients }) => {
    if (!ingredients?.length) {
        return <p className={styles.empty}>No ingredients available</p>;
    }

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>INGREDIENTS</h3>
            <ul className={styles.list}>
                {ingredients.map((item, index) => (
                    <li key={item.id || index} className={styles.item}>
                        <div className={styles.imageBox}>
                            <img src={item.img} alt={item.name} className={styles.image} />
                        </div>
                        <div className={styles.textWrapper}>
                            <div className={styles.name}>{item.name}</div>
                            <div className={styles.amount}>{item.RecipeIngredient?.measure || '-'}</div>
                        </div>
                    </li>
                ))}
            </ul>

        </div>

    );
};

export default RecipeIngredients;
