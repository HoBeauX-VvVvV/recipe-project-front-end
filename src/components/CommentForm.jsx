import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ recipeId, fetchComments }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post(`http://localhost:3000/recipes/${recipeId}/comments`, { text }, 
      { headers: { Authorization: `Bearer ${token}` }
      });
      fetchComments(); 
      setText('');
    } catch (error) {
      setError('Please sign in to comment');
    }
  };

  return (
    <form className="mb-3" onSubmit={handleSubmit}>
      <textarea
        className="form-control mb-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment"
        required
      />
      {error && <p>{error}</p>}
      <button type="submit" className="btn btn-primary btn-sm">Post Comment</button>
    </form>
  );
};

export default CommentForm;