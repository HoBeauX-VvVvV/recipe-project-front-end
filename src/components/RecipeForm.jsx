import React, { useState } from 'react';
import axios from 'axios';

const RecipeForm = ({ fetchRecipes, recipe }) => {
  const [title, setTitle] = useState(recipe ? recipe.title : '');
  const [ingredients, setIngredients] = useState(recipe ? recipe.ingredients.join(', ') : '');
  const [instructions, setInstructions] = useState(recipe ? recipe.instructions : '');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const newRecipe = {
      title,
      ingredients: ingredients.split(',').map(item => item.trim()), 
      instructions
    };

    try {
      if (recipe) {
        await axios.put(`http://localhost:3000/recipes/${recipe._id}`, newRecipe, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:3000/recipes', newRecipe, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      fetchRecipes(); 
      setTitle('');
      setIngredients('');
      setInstructions('');
    } catch (error) {
      setError('Please sign in to post a recipe');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Ingredients</label>
        <input
          type="text"
          className="form-control"
          placeholder="Ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Instructions</label>
        <textarea
          className="form-control"
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-danger">{error}</p>}
      <button type="submit" className="btn btn-primary">
        {recipe ? 'Update Recipe' : 'Add Recipe'}
      </button>
    </form>
  );
};

export default RecipeForm;