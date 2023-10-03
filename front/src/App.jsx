import React from 'react';
import './App.css'
import LoginForm from './components/Login/Login'
import Logout from './components/Logout/Logout'
import Profile from './components/Profile/Profile'
import LandingPage from '../src/components/LandingPage/LandingPage';
import CreateProduct from '../src/components/CreateProduct/CreateProduct';
import Home from '../src/components/Home/Home'
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div id="app" className='home-container'>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/createaproduct' element={<CreateProduct />}></Route>
      </Routes>
      
    </div>
  );
};

export default App;
