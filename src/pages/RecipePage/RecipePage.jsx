import css from "./Recipe.module.css";
import RecipeMainInfo from "../../components/RecipeMainInfo/RecipeMainInfo";
import RecipeIngredients from "../../components/RecipeIngredients/RecipeIngredients";
import RecipePreparation from "../../components/RecipePreparation/RecipePreparation";
import PopularRecipes from "../../components/PopularRecipes/PopularRecipes";

// Static recipe data matching Figma example
const staticRecipe = {
  title: "SALMON AVOCADO SALAD",
  category: "Seafood",
  description:
    "Is a healthy salad recipe that’s big on nutrients and flavor. A moist, pan seared salmon is layered on top of spinach, avocado, tomatoes, and red onions. Then drizzled with a homemade lemon vinaigrette. Is a healthy salad recipe that’s big on nutrients and flavor.",
  preview: "http://localhost:3845/assets/f03434b20d2b1fb9dafdbef4ecb99b302e98bfeb.png",
  author: { name: "Nadia", avatar: "http://localhost:3845/assets/4f575e5f37e177eaeca331e1917a6f0665df2316.png" },
  ingredients: [
    { name: "Salmon", amount: "400 g", image: "http://localhost:3845/assets/0776818603c11c493a7ab1644976e03d6a70a1a7.png" },
    { name: "Avocado", amount: "3", image: "http://localhost:3845/assets/03d9b08554dc9174cc6be308df8a2dc47df27297.png" },
    { name: "Cucumber", amount: "1", image: "http://localhost:3845/assets/99b6c526f76422525151f68e1c0cc21b0d3a7678.png" },
    { name: "Spinach", amount: "400 g", image: "http://localhost:3845/assets/a728301bcba4075b28ad4b884a0d710e4b6704a4.png" },
    { name: "Mint", amount: "4 tbs", image: "http://localhost:3845/assets/5a78f5c6b0105e4b9f800ea3c992f57bd65bfad1.png" },
    { name: "Lime", amount: "1", image: "http://localhost:3845/assets/93639552ec970ba5e89e6ee099676a68a5333c77.png" },
    { name: "Honey", amount: "2 tsp", image: "http://localhost:3845/assets/0810d49b6bb63a51831d1debeb656c1cf639b7c1.png" },
    { name: "Olive oil", amount: "3 tbs", image: "http://localhost:3845/assets/fbea244ba4a2d406f2bda8ff9b9be1079f880de1.png" },
  ],
  preparation:
    "Is a healthy salad recipe that’s big on nutrients and flavor. A moist, pan seared salmon is layered on top of spinach, avocado, tomatoes, and red onions. Then drizzled with a homemade lemon vinaigrette. Is a healthy salad recipe that’s big on nutrients and flavor. A moist, pan seared salmon is layered on top of spinach, avocado, tomatoes, and red onions. Then drizzled with a homemade lemon vinaigrette.",
};

const RecipePage = () => {
  return (
    <div className={css.container}>
      {/* Breadcrumbs */}
      <nav className={css.breadcrumbs}>
        <span className={css.breadcrumbHome}>Home</span>
        <span className={css.breadcrumbDivider}>/</span>
        <span className={css.breadcrumbCurrent}>{staticRecipe.title}</span>
      </nav>

      {/* Main Info */}
      <RecipeMainInfo recipe={staticRecipe} />
      {/* Ingredients */}
      <RecipeIngredients ingredients={staticRecipe.ingredients} />
      {/* Preparation */}
      <RecipePreparation preparation={staticRecipe.preparation} />
      {/* Popular Recipes */}
      <PopularRecipes />
    </div>
  );
};

export default RecipePage;
