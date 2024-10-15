import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById, updateRecipe } from '../services/recipeService';

const EditRecipe = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: ''
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeById(recipeId);
        setRecipe(data);
        setFormData({
          title: data.title,
          ingredients: data.ingredients.join(', '),
          instructions: data.instructions
        });
      } catch (error) {
        setError('Recipe not found');
      }
    };
    fetchRecipe();
  }, [recipeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedRecipe = {
        title: formData.title,
        ingredients: formData.ingredients.split(',').map(ingredient => ingredient.trim()),
        instructions: formData.instructions,
      };
      await updateRecipe(recipeId, updatedRecipe);
      navigate(`/recipes/${recipeId}`); 
    } catch (error) {
      setError('Failed to update recipe');
    }
  };

  if (error) return <p>{error}</p>;
  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4">Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Ingredients (comma-separated)</label>
          <input
            type="text"
            name="ingredients"
            className="form-control"
            value={formData.ingredients}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Instructions</label>
          <textarea
            name="instructions"
            className="form-control"
            value={formData.instructions}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-50">Save Changes</button>
      </form>
    </div>
  );
};

export default EditRecipe;