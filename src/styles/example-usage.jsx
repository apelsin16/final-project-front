// Приклад використання CSS змінних в React компонентах
// Цей файл показує, як правильно використовувати наші змінні

import styles from './example.module.css';

// Приклад компонента з використанням змінних
const ExampleComponent = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Foodies</h1>
            <p className={styles.description}>
                Discover a diverse range of culinary revelations and enjoy exquisite recipes that combine
                tastes, styles and the vivid descriptions of various cuisines.
            </p>

            {/* Використання наших Button компонентів */}
            <div className={styles.buttonGroup}>
                <button className={styles.primaryButton}>Sign In</button>
                <button className={styles.whiteButton}>Add Recipe</button>
                <button className={styles.disabledButton} disabled>
                    Publish
                </button>
            </div>

            {/* Картка рецепту */}
            <div className={styles.recipeCard}>
                <img src='/recipe-image.jpg' alt='Recipe' className={styles.recipeImage} />
                <h3 className={styles.recipeTitle}>Salmon Avocado Salad</h3>
                <p className={styles.recipeDescription}>
                    A healthy salad recipe that's big on nutrients and flavor.
                </p>
            </div>
        </div>
    );
};

export default ExampleComponent;
