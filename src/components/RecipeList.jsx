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
      <h2 className="mb-4">Recipes</h2>
      {error && <p>{error}</p>}

      <div className="d-flex flex-column gap-4"> 
        {recipes.map((recipe) => (
          <div key={recipe._id} className="card shadow-sm">
            <div className="card-body">
              <h3>{recipe.title}</h3>
              <p>
                <strong>Ingredients:</strong> {recipe.ingredients.join(', ')}
              </p>
              <Link to={`/recipes/${recipe._id}`} className="btn btn-primary btn-sm">
                View Recipe
              </Link>
            </div>
            <div className="card-footer">
              <CommentForm recipeId={recipe._id} fetchComments={fetchRecipes} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <h4 className="mb-3">Add New Recipe</h4>
        <RecipeForm fetchRecipes={fetchRecipes} />
      </div>
    </div>
  );
};
export default RecipeList;