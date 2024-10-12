import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import SignupForm from './components/SignupForm';
import SigninForm from './components/SigninForm';
import RecipeShow from './components/RecipeShow';
import EditRecipe from './components/EditRecipe';
import NavBar from './components/NavBar';
import './App.css'

const App = () => {
  return (
    <Router>
      <div>
        <header>
        <NavBar />
          <h1>Recipe Collection App</h1>
         </header>
         <main>
          <Routes>
            <Route path="/recipes" element={<RecipeList />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/signin" element={<SigninForm />} />
            <Route path="/recipes/:recipeId" element={<RecipeShow />} />
            <Route path="/recipes/:recipeId/edit" element={<EditRecipe />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;