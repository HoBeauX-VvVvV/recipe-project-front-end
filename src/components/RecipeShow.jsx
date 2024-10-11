import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../services/recipeService';

const RecipeShow = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');

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

  if (error) return <p>{error}</p>;
  if (!recipe) return <p>Loading...</p>;

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p><strong>Author:</strong> {recipe.author?.username}</p>
      <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
      
      <h3>Comments</h3>
      {recipe.comments.length > 0 ? (
        recipe.comments.map((comment, index) => (
          <div key={index}>
            <p>{comment.text}</p>
            <p><strong>Comment by:</strong> {comment.author?.username}</p>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default RecipeShow;