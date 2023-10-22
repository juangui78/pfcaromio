import './App.css'

import { React, useState, useEffect } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth, UserButton } from '@clerk/clerk-react';
import axios from 'axios';
axios.defaults.baseURL = "https://pfcaromio-production.up.railway.app/"
import LoginForm from './components/Login/Login'
import Slide from './components/Slide/Slide';
import Logout from './components/Logout/Logout'
import Profile from './components/Profile/Profile'
import NavBar from '../src/components/NavBar/Navbar'
import LandingPage from '../src/components/LandingPage/LandingPage';
import CreateProduct from './components/FormProduct/FormProduct';
import ProductDetails from './components/ProductDetails/ProductDetails'
import Products from './components/Products/Products'
import Restaurants from '../src/components/Restaurants/Restaurants'
import Register from './components/Register/Register';
import RegisterForm from './components/FormRegister/RegisterForm';
import ShoppingCard from './components/ShoppingCard/ShoppingCard';
import DashboardSeller from './components/DashboardSeller/DashboardSeller';
import MyRestaurant from './components/MiRestaurante/MiRestaurante';

const App = () => {

  const { isSignedIn, userId } = useAuth()
  const { pathname } = useLocation();
  const [userData, setUserData] = useState((null))

  const showProductDetails = useSelector((state) => state.modalProductDetails);
  const showCart = useSelector((state) => state.modalCart);
  const products = useSelector((state) => state.products);
  const searchState = useSelector((state) => state.search);
  const searchBy = useSelector((state) => state.searchBy);
  const showRestaurants = (!searchState || (searchState && searchBy) === 'restaurante') ? true : false;
  const showProducts =  (searchState && searchBy === 'pizza') ? true : false;
  
  useEffect(() => {
 
    axios.get(`users/${userId}`)
      .then((data) => {
        data && setUserData(data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [userId, searchState])

  return (
    <div id="app" className='home-container' style={{ height: '100vh' }}>

      {
        (pathname !== "/" && pathname !== "/createProduct" && pathname !== "/login" && pathname !== "/registerForm") && (<NavBar userData={userData} />)

      }
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route
          path='/home'
          element={
            userData?.[0]?.role === "Seller"
              ? <DashboardSeller userData={userData} />
              : <>
                <Slide />
                {
                 showProducts && <Products />
                }
                {
                  showRestaurants && <Restaurants />
                }
              </>
          } />

        <Route path="/products" element={<Products />} />
        <Route path="/products/:storeId" element={<Products />} />
        <Route path='/createproduct' element={<CreateProduct userData={userData} />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/registerForm' element={<RegisterForm />}></Route>
        <Route path='/login' element={<LoginForm />}></Route>
        {/* <Route path='/myRestaurant' element={<DashboardSeller userData={userData} />}></Route> */}
        {/*   <Route path='/myRestaurant' element={<MyRestaurant />}></Route> */}

      </Routes>

      <ProductDetails show={showProductDetails} />
      <ShoppingCard show={showCart} />

    </div>
  );
};

export default App;
