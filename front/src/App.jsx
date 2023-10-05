import './App.css'

import {React, useState} from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import {useSelector } from 'react-redux';

import LoginForm from './components/Login/Login'
import Logout from './components/Logout/Logout'
import Profile from './components/Profile/Profile'
import NavBar from '../src/components/NavBar/Navbar'
import LandingPage from '../src/components/LandingPage/LandingPage';
import CreateProduct from '../src/components/CreateProduct/CreateProduct';
import Home from '../src/components/Home/Home'
import ProductDetails from './components/ProductDetails/ProductDetails'
import Products from './components/Products/Products'
import Restaurants from '../src/components/Restaurants/Restaurants'
import ShoppingCard from './components/ShoppingCard/ShoppingCard';


const App = () => {
  const { pathname } = useLocation();
  
  const showProductDetails = useSelector((state) => state.modalProductDetails);
  const showCart = useSelector((state) => state.modalCart);

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
        <Route path='/createproduct' element={<CreateProduct />}></Route>

      </Routes>
      
      <ProductDetails show={showProductDetails} />
      <ShoppingCard show={showCart} />

    </div>
  );
};

export default App;
