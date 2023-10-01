import React from 'react';
import './App.css'
import LoginForm from './components/Login/Login'
import Logout from './components/Logout/Logout'
import Profile from './components/Profile/Profile'
import NavBar from '../src/components/NavBar/Navbar'
import LandingPage from '../src/components/LandingPage/LandingPage';
import Home from '../src/components/Home/Home'
import ProductDetails from './components/ProductDetails/ProductDetails'
import Products from './components/Products/Products'
import CreateProduct from './components/CreateProduct/CreateProduct';
import Test from './components/PruebaDeUsuarios/RegisterToBD'
import { Route, Routes, useLocation } from 'react-router-dom';

const App = () => {
  const { pathname } = useLocation();

  return (
    <div id="app" className='home-container'>
      {
        pathname !== "/" && pathname !== "/createProduct" && (<NavBar />)
      }
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path='/createProduct' element={<CreateProduct/>}></Route>
        <Route path='/test' element={<Test/>}></Route>
      </Routes>

    </div>
  );
};

export default App;
