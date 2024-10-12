import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeForm from './RecipeForm';
import CommentForm from './CommentForm';
import { Link } from 'react-router-dom';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');
  
  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/recipes');
      setRecipes(response.data);
    } catch (error) {
      setError('Error fetching recipes');
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div>
      <h2>Recipes</h2>
      {error && <p>{error}</p>}
      
      {recipes.map(recipe => (
        <div key={recipe._id}>
          <h3>{recipe.title}</h3>
          <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
          <Link to={`/recipes/${recipe._id}`}>View Recipe</Link>
          <CommentForm recipeId={recipe._id} fetchComments={fetchRecipes} />
          <hr />
        </div>
      ))}
      <h1>Add New Recipe</h1>
      <RecipeForm fetchRecipes={fetchRecipes} /><hr />
    </div>
  );
};

export default RecipeList;