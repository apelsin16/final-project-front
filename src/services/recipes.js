import api from "./api";

export const getRecipeById = async (id) => {
    const { data } = await api.get(`/recipes/${id}`);
    return data.data.recipe;
};
