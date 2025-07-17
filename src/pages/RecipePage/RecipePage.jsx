import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import css from "./Recipe.module.css";

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
      {/* Breadcrumbs */}
      <nav className={css.breadcrumbs}>
        <span className={css.breadcrumbHome}>Home</span>
        <span className={css.breadcrumbDivider}>/</span>
        <span className={css.breadcrumbCurrent}>{recipe.title}</span>
      </nav>

      <RecipeMainInfo recipe={recipe} />
      <RecipeIngredients ingredients={recipe.ingredients} />
      <RecipePreparation preparation={recipe.instructions} />
      <PopularRecipes />
    </div>
  );
};

export default RecipePage;
