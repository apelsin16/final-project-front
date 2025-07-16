import api from "./api";

export const getRecipeById = async (id) => {
    const { data } = await api.get(`/recipes/${id}`);
    return data;
};

export const getPopularRecipes = async () => {
    const { data } = await api.get("/recipes/popular?limit=4");
    return data.popularRecipes;
};