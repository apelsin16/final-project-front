import React from "react";
import styles from "./RecipeMainInfo.module.css";

const RecipeMainInfo = ({ recipe }) => {
    if (!recipe) return null;

    const { title, category, time, description, thumb, owner, } = recipe;

    return (
        <div className={styles.wrapper}>
            <div className={styles.imageContainer}>
                <img src={thumb} alt={title} className={styles.image} />
            </div>
            <div className={styles.infoContainer}>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.tagsRow}>
                    <span className={styles.category}>{category.name}</span>
                    <span className={styles.time}>{time}</span>
                </div>
                <p className={styles.description}>{description}</p>
                <div className={styles.authorInfo}>
                    <img src={owner.avatarURL} alt={owner.name} className={styles.authorAvatar} />
                    <div>
                        <div className={styles.createdBy}>Created by:</div>
                        <div className={styles.authorName}>{owner.name}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeMainInfo;
