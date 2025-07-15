import { useParams } from "react-router-dom";
import css from "./Recipe.module.css";

import RecipeInfo from "../../components/RecipeInfo/RecipeInfo";
import PopularRecipes from "../../components/PopularRecipes/PopularRecipes";

const RecipePage = () => {
    const { id } = useParams();

    return (
        <div className={css.container}>
            <div>
                Recipe ID: {id}
            </div>

            <RecipeInfo id={id} />
            <PopularRecipes />
        </div>
    );
};

export default RecipePage;
