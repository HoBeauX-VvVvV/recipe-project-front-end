import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById, deleteRecipe } from '../services/recipeService';

const RecipeShow = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(recipeId);
        setRecipe(data);
      } catch (error) {
        setError('Recipe not found');
      }
    };
    fetchRecipe();
  }, [recipeId]);

  const handleDelete = async () => {
    try {
      await deleteRecipe(recipeId); 
      navigate('/recipes'); 
    } catch (error) {
      setError('Failed to delete recipe');
    }
  };

  const handleEdit = () => {
    navigate(`/recipes/${recipeId}/edit`);
  };

  if (error) return <p>{error}</p>;
  if (!recipe) return <p>Loading...</p>;

  const isAuthor = recipe.author && recipe.author._id === localStorage.getItem('userId');


  return (
    <div>
      <h2>{recipe.title}</h2>
      <p><strong>Author:</strong> {recipe.author?.username}</p>
      <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
      <hr/>
      <h3>Comments</h3>
      {recipe.comments.length > 0 ? (
        recipe.comments.map((comment, index) => (
          <div key={index}>
            <p>{comment.text}</p>
            <p>Comment by:<strong> {comment.author?.username}</strong></p>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
       {isAuthor && (
        <div>
          <button onClick={handleEdit}>Edit Recipe</button>
          <button onClick={handleDelete}>Delete Recipe</button>
        </div>
      )}
    </div>
  );
};

export default RecipeShow;