import './App.css'

import { React, useState, useEffect } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth, UserButton } from '@clerk/clerk-react';
import axios from 'axios';

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
import DashExample from './components/DashExampleComponent/DashExample';
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
  console.log(userId);
  useEffect(() => {
    userId && axios.get(`http://localhost:3004/users/${userId}`)
      .then(({ data }) => {
        if (data.length > 0) {
          setUserData(data[0])
          setTypeUser(data[0].role);
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error)
      })

  }, [userId, searchState])
  console.log('URL: ' + BACKEND_URL_LOCAL);
  console.log(typeUser);
  console.log('info user: ' + userData);
  return (
    <div id="app" className='home-container' style={{ height: '100vh' }}>

      {
        (pathname !== "/" && pathname !== "/createProduct" && pathname !== "/login" && pathname !== "/registerForm" && pathname !== "/register") && (<NavBar userData={userData} />)
      }
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route
          path="/home"
          element={
            typeUser === "Seller"
              ? <DashboardSeller userData={userData} setUserData={setUserData} />
              : typeUser === "Admin" // Agregar la tercera opción para Admin
                ? <DashExample /> // Reemplaza "AdminComponent" con el componente que deseas mostrar para los usuarios Admin
                : (
                  <>
                    <Slide visible={typeUser !== "Seller"} />
                    {
                      showProducts && <Products />
                    }
                    {
                      showRestaurants && <Restaurants />
                    }
                  </>
                )
          }
        />

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
