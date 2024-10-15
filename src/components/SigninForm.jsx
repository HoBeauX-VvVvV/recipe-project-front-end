import React, { useState } from 'react';
import { signin } from '../services/authService';


const SigninForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState(''); 


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signin(username, password);
      setWelcomeMessage(`Welcome, ${username}!`);
      setError('');
    } catch (error) {
      setError('Invalid username or password');
      setWelcomeMessage('');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Sign In</h2>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit" className="btn btn-primary w-50">Sign In</button>
      </form>
      {welcomeMessage && <p className="text-success">{welcomeMessage}</p>}
    </div>
  );
};

export default SigninForm;