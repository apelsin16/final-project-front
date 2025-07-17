import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import css from "./Recipe.module.css";
import PathInfo from "../../components/common/ui/PathInfo/PathInfo";

import { getRecipeById } from "../../services/recipes";

import RecipeMainInfo from "../../components/RecipeMainInfo/RecipeMainInfo";
import RecipeIngredients from "../../components/RecipeIngredients/RecipeIngredients";
import RecipePreparation from "../../components/RecipePreparation/RecipePreparation";
import PopularRecipes from "../../components/PopularRecipes/PopularRecipes";

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeData = await getRecipeById(id);
        console.log(recipeData);
        setRecipe(recipeData);
      } catch (error) {
        const message = error?.message;
        toast.error(message ?? "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div className={css.container}>
      {/* Breadcrumbs using shared PathInfo component */}
      <PathInfo
        currentPage={recipe.title}
        homeText="Home"
        className={css.breadcrumbs}
      />

      <div className={css.mainContent}>
        <div className={css.leftCol}>
          <img
            src={recipe.thumb}
            alt={recipe.title}
            className={css.recipeImage}
          />
        </div>
        <div className={css.rightCol}>
          <RecipeMainInfo recipe={recipe} hideImage />
          <RecipeIngredients ingredients={recipe.ingredients} />
          <RecipePreparation preparation={recipe.instructions} />
        </div>
      </div>
      <PopularRecipes />
    </div>
  );
};

export default RecipePage;
