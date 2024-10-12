import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

const NavBar = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <nav>
      <button onClick={() => handleNavigate('/recipes')}>Recipes</button> 
      <button onClick={() => handleNavigate('/signup')}>Sign Up</button> 
      {localStorage.getItem('token') ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={() => handleNavigate('/signin')}>Sign In</button>
      )}
    </nav>
  );
};

export default NavBar