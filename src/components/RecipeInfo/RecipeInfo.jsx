import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getRecipeById } from "../../services/recipes";
import RecipeMainInfo from "../RecipeMainInfo/RecipeMainInfo";
import RecipeIngredients from "../RecipeIngredients/RecipeIngredients";
import RecipePreparation from "../RecipePreparation/RecipePreparation";

// ВРЕМЕННЫЙ МОК данных
const mockGetRecipeById = async (id) => {
  await new Promise((res) => setTimeout(res, 500)); // искусственная задержка
  return {
    title: "Борщ украинский",
    category: "Супы",
    description: "Классический рецепт борща с буряком и капустой.",
    preview: "https://via.placeholder.com/600x400?text=Borshch",
    author: { name: "Олена" },
    ingredients: [
      { name: "Свекла", amount: "2 шт", image: "" },
      { name: "Капуста", amount: "300 г", image: "" },
      { name: "Картофель", amount: "3 шт", image: "" },
    ],
    preparation:
      "Отварите свеклу и нарежьте соломкой. Обжарьте лук, морковь и томатную пасту. Варите всё вместе с картофелем и капустой до готовности.",
  };
};

const RecipeInfo = ({ id }) => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      try {
        const data = await mockGetRecipeById(id);
        setRecipe(data);
      } catch (error) {
        toast.error("Не удалось загрузить рецепт");
      } finally {
        setLoading(false);
      }
    };

    const fetchRecipeTest = async () => {
      try {
        const data = await getRecipeById(id);
        console.log(JSON.stringify(data));
      } catch (error) {
        const { message } = error;
        toast.error(message ?? "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeTest();
    fetchRecipe();
  }, [id]);

  if (loading) return <p>Завантаження рецепта...</p>;
  if (!recipe) return <p>Рецепт не знайдено.</p>;

  return (
    <>
      <RecipeMainInfo recipe={recipe} />
      <RecipeIngredients ingredients={recipe.ingredients} />
      <RecipePreparation preparation={recipe.instructions} recipeId={recipe.id} />
    </>
  );
};

export default RecipeInfo;
