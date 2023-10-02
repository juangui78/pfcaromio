import './App.css'

import {React, useState} from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import {useSelector } from 'react-redux';

import LoginForm from './components/Login/Login'
import Logout from './components/Logout/Logout'
import Profile from './components/Profile/Profile'
import NavBar from '../src/components/NavBar/Navbar'
import LandingPage from '../src/components/LandingPage/LandingPage';
import Home from '../src/components/Home/Home'
import ProductDetails from './components/ProductDetails/ProductDetails'
import Products from './components/Products/Products'
import CreateProduct from './components/CreateProduct/CreateProduct';
import Restaurants from '../src/components/Restaurants/Restaurants'


const App = () => {
  const { pathname } = useLocation();
  
  const showProductDetails = useSelector((state) => state.modalProductDetails);

  return (
    <div id="app" className='home-container'>
      {
        (pathname !== "/" && pathname !== "/createProduct") && (<NavBar />)
      }
       <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/home' element={<Restaurants />}></Route>
        <Route path="/products" element={<Products />} /> 
        <Route path="/products/:id" element={<Products />} />
      </Routes>
      
      <ProductDetails show={showProductDetails} />

    </div>
  );
};

export default App;
