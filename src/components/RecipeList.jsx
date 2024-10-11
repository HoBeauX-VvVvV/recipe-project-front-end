import React, { useState } from 'react';
import axios from 'axios';

const RecipeForm = ({ fetchRecipes, recipe }) => {
  const [title, setTitle] = useState(recipe ? recipe.title : '');
  const [ingredients, setIngredients] = useState(recipe ? recipe.ingredients.join(', ') : '');
  const [instructions, setInstructions] = useState(recipe ? recipe.instructions : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const newRecipe = {
      title,
      ingredients: ingredients.split(',').map(item => item.trim()),
      instructions
    };
       await axios.put(`http://localhost:3000/recipes/${recipe._id}`, newRecipe, {
          headers: { Authorization: `Bearer ${token}` }
        });
      fetchRecipes(); 
      setTitle('');
      setIngredients('');
      setInstructions('');
   };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Ingredients (comma separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        required
      />
      <textarea
        placeholder="Instructions"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        required
      />
      {error && <p>{error}</p>}
      <button type="submit">{recipe ? 'Update Recipe' : 'Add Recipe'}</button>
    </form>
  );
};

export default RecipeForm;