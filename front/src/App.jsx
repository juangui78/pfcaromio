import './App.css'

import {React, useState} from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import {useSelector } from 'react-redux';

import LoginForm from './components/Login/Login'
import Logout from './components/Logout/Logout'
import Profile from './components/Profile/Profile'
import NavBar from '../src/components/NavBar/NavBar';
import LandingPage from '../src/components/LandingPage/LandingPage';
import Home from '../src/components/Home/Home'
import ProductDetails from './components/ProductDetails/ProductDetails'
import Products from './components/Products/Products'


const App = () => {
  const { pathname } = useLocation();
  
  const showProductDetails = useSelector((state) => state.modalProductDetails);

  return (
    <div id="app" className='home-container'>
      {
        pathname !== "/" && (<NavBar />)
      }
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path="/products" element={<Products />} />
      </Routes>
      
      <ProductDetails show={showProductDetails} />

    </div>
  );
};

export default App;
