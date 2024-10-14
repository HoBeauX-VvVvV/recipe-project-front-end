import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipeById, deleteRecipe } from '../services/recipeService';
import { editComment, deleteComment } from '../services/commentService';

const RecipeShow = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [commentText, setCommentText] = useState('');
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

  const handleDeleteRecipe = async () => {
    try {
      await deleteRecipe(recipeId); 
      navigate('/recipes'); 
    } catch (error) {
      setError('Failed to delete recipe');
    }
  };

  const handleEditRecipe = () => {
    navigate(`/recipes/${recipeId}/edit`);
  };

  const startEditingComment = (commentId, currentText) => {
    setEditingCommentId(commentId);
    setCommentText(currentText);
  };

  const handleEditComment = async (commentId) => {
    try {
      const updatedComment = await editComment(recipeId, commentId, commentText);
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        comments: prevRecipe.comments.map((comment) =>
          comment._id === commentId ? updatedComment : comment
        ),
      }));
      setEditingCommentId(null);
      setCommentText('');
    } catch (error) {
      console.error('Failed to edit comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(recipeId, commentId);
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        comments: prevRecipe.comments.filter((comment) => comment._id !== commentId),
      }));
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  if (error) return <p>{error}</p>;
  if (!recipe) return <p>Loading...</p>;

  const userId = localStorage.getItem('userId');
  const isAuthor = recipe.author && recipe.author._id === localStorage.getItem('userId');


  return (
    <div>
      <h2>{recipe.title}</h2>
      <p><strong>Author:</strong> {recipe.author?.username}</p>
      <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
      {isAuthor && (
        <div>
          <button onClick={handleEditRecipe}>Edit Recipe</button>
          <button onClick={handleDeleteRecipe}>Delete Recipe</button>
        </div>
      )}
      <hr/>
      <h3>Comments</h3>
      {recipe.comments.length > 0 ? (
        recipe.comments.map((comment) => {
          const isCommentAuthor = comment.author && comment.author._id === userId;
          return (
            <div key={comment._id}>
              <p>{comment.text}</p>
              <p>Comment by: <strong>{comment.author?.username}</strong></p>
              {isCommentAuthor && (
                <div>
                  {editingCommentId === comment._id ? (
                    <div>
                      <textarea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                      />
                      <button onClick={() => handleEditComment(comment._id)}>Save</button>
                      <button onClick={() => setEditingCommentId(null)}>Cancel</button>
                    </div>
                  ) : (
                    <div>
                      <button onClick={() => startEditingComment(comment._id, comment.text)}>Edit Comment</button>
                      <button onClick={() => handleDeleteComment(comment._id)}>Delete Comment</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};


export default RecipeShow;