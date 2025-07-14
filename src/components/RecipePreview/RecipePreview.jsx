import { useState } from "react";
import css from "./RecipePreview.module.css";
import IconButton from "../common/ui/IconButton/IconButton";

function RecipePreview({ recipe, onDelete, activeTab, isDeleting }) {
  const [isVisible, setIsVisible] = useState(true);
  const recipeId = recipe.id || recipe._id;

  const handleArrowClick = () => {
    console.log("Arrow clicked - open recipe");
  };

  const handleDeleteClick = async () => {
    console.log("Delete clicked");
    if (isDeleting) return;
    setIsVisible(false);

    try {
      if (typeof onDelete === "function") {
        await onDelete(recipeId);
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
      setIsVisible(true);
    }
  };

  const showDeleteButton =
    (activeTab === "my-recipes" || activeTab === "my-favorites") &&
    typeof onDelete === "function";

  if (!isVisible) return null;

  return (
    <div className={css.card}>
      <div className={css.imageWrapper} onClick={handleArrowClick}>
        <img
          src={recipe.thumb || "/placeholder.jpg"}
          alt={recipe.title}
          className={css.image}
        />
      </div>

      <div className={css.content}>
        <div className={css.text}>
          <p className={css.title}>{recipe.title}</p>
          <p className={css.description}>{recipe.description}</p>
        </div>

        <div className={css.actions}>
          <IconButton
            icon="arrow"
            onClick={handleArrowClick}
            ariaLabel="Go to recipe"
          />

          {showDeleteButton && (
            <IconButton
              icon="delete"
              onClick={handleDeleteClick}
              ariaLabel={
                activeTab === "my-recipes"
                  ? "Delete recipe"
                  : "Remove from favorites"
              }
              disabled={isDeleting}
            />
          )}

          {isDeleting && (
            <span className={css.loading}>
              {activeTab === "my-recipes" ? "Deleting..." : "Removing..."}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipePreview;
