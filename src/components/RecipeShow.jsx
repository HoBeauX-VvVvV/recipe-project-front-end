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
    <div className="container mt-4">
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">{recipe.title}</h2>
          <p className="text-muted"><strong>Author:</strong> {recipe.author?.username}</p>
          <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
          <p><strong>Instructions:</strong> {recipe.instructions}</p>
          {isAuthor && (
            <div className="mt-3">
              <button onClick={handleEditRecipe} className="btn btn-primary me-2">Edit Recipe</button>
              <button onClick={handleDeleteRecipe} className="btn btn-primary">Delete Recipe</button>
            </div>
          )}
        </div>
      </div>

      <h3>Comments</h3>
      <div className="d-flex flex-column gap-3">
        {recipe.comments.length > 0 ? (
          recipe.comments.map((comment) => {
            const isCommentAuthor = comment.author && comment.author._id === userId;
            return (
              <div key={comment._id} className="card shadow-sm">
                <div className="card-body">
                  <p className="card-text">{comment.text}</p>
                  <p className="text-muted"><small>By {comment.author?.username}</small></p>
                  {isCommentAuthor && (
                    <div className="mt-2">
                      {editingCommentId === comment._id ? (
                        <div>
                          <textarea
                            className="form-control mb-2"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                          />
                          <button onClick={() => handleEditComment(comment._id)} className="btn btn-primary btn-sm me-2">Save</button>
                          <button onClick={() => setEditingCommentId(null)} className="btn btn-secondary btn-sm">Cancel</button>
                        </div>
                      ) : (
                        <div>
                          <button onClick={() => startEditingComment(comment._id, comment.text)} className="btn btn-primary btn-sm me-2">Edit Comment</button>
                          <button onClick={() => handleDeleteComment(comment._id)} className="btn btn-primary btn-sm">Delete Comment</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeShow;