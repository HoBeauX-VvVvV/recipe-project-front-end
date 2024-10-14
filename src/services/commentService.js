import api from './api';

export const editComment = async (recipeId, commentId, text) => {
  const response = await api.put(`/recipes/${recipeId}/comments/${commentId}`, { text });
  return response.data;
};

export const deleteComment = async (recipeId, commentId) => {
  const response = await api.delete(`/recipes/${recipeId}/comments/${commentId}`);
  return response.data;
};