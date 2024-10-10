import api from './api';

export const getRecipes = async () => {
  const response = await api.get('/recipes');
  return response.data;
};

export const getRecipeById = async (recipeId) => {
  const response = await api.get(`/recipes/${recipeId}`);
  return response.data;
};

export const createRecipe = async (recipeData) => {
  const response = await api.post('/recipes', recipeData);
  return response.data;
};

export const updateRecipe = async (recipeId, recipeData) => {
  const response = await api.put(`/recipes/${recipeId}`, recipeData);
  return response.data;
};

export const deleteRecipe = async (recipeId) => {
  const response = await api.delete(`/recipes/${recipeId}`);
  return response.data;
};