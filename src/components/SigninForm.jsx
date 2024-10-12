import React, { useState } from 'react';
import { signin } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const SigninForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signin(username, password);
      setWelcomeMessage(`Welcome, ${username}!`);
    } catch (error) {
      setError('Invalid username or password');
      setWelcomeMessage('');
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p>{error}</p>} 
      <button type="submit">Sign In</button>
    </form>
    {welcomeMessage && <p>{welcomeMessage}</p>}
    </div>
  );
};

export default SigninForm;