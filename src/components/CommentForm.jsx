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
      setError('Error adding comment');
    }
  };

  return (
    <form className="comments" onSubmit={handleSubmit}>
      <textarea className="comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a comment"
        required
      />
      {error && <p>{error}</p>}
      <button type="submit">Post Comment</button>
    </form>
  );
};

export default CommentForm;