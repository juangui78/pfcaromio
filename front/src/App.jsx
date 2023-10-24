import './App.css'

import { React, useState, useEffect } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth, UserButton } from '@clerk/clerk-react';
import axios from 'axios';


import DashboardAdmin from './components/DashboardAdmin/DashboardAdmin';
const BACKEND_URL_LOCAL = import.meta.env.VITE_BACKEND_URL;

// REEMPLAZAR URL de VITE
//import MyRestaurant from './components/MiRestaurante/MiRestaurante';

const App = () => {

  const { isSignedIn, userId } = useAuth()
  const { pathname } = useLocation();
  const [userData, setUserData] = useState(null)
  const [typeUser, setTypeUser] = useState(null)
  const showProductDetails = useSelector((state) => state.modalProductDetails);
  const showCart = useSelector((state) => state.modalCart);
  const products = useSelector((state) => state.products);
  const searchState = useSelector((state) => state.search);
  const searchBy = useSelector((state) => state.searchBy);
  const showRestaurants = (!searchState || (searchState && searchBy) === 'restaurante') ? true : false;
  const showProducts = (searchState && searchBy === 'pizza') ? true : false;

  useEffect(() => {

  }, [])

  return (
    <div id="app" className='home-container' style={{ height: '100vh' }}>

      <DashboardAdmin />

    </div>
  );
};

export default App;
