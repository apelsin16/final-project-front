import React, { useState } from "react";
import styles from "./RecipePreparation.module.css";

const RecipePreparation = ({ preparation }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const handleToggleFavorite = () => {
        setIsFavorite((prev) => !prev);
    };

    // Split preparation into steps if numbered
    const steps = preparation.split(/\n|\r|(?=\d+\.)/g).filter(Boolean);

    return (
        <div className={styles.wrapper}>
            <h3 className={styles.title}>Recipe Preparation</h3>
            <div className={styles.text}>
                {steps.length > 1 ? (
                  <ol>
                    {steps.map((step, idx) => (
                      <li key={idx}>{step.replace(/^\d+\.\s*/, "")}</li>
                    ))}
                  </ol>
                ) : (
                  <p>{preparation}</p>
                )}
            </div>
            <button className={styles.button} onClick={handleToggleFavorite}>
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
        </div>
    );
};

export default RecipePreparation;
