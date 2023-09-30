import React from 'react';
import './App.css'
import LoginForm from './components/Login/Login'
import Logout from './components/Logout/Logout'
import Profile from './components/Profile/Profile'import LandingPage from '../src/components/LandingPage/LandingPage';
import Home from '../src/components/Home/Home'

const App = () => {
  return (
    <div id="app" className='home-container'>
      <Home />
    </div>
  );
};

export default App;
