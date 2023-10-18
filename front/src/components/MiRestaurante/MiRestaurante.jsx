import './MiRestaurante.css'
import axios from "axios"
import { useAuth} from '@clerk/clerk-react'
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import MyProductsCard from '../MyProductsCard/MyProductsCard'
export default function MyRestaurant () {
    const {isSignedIn, userId} = useAuth()
    const navigate = useNavigate()
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        userId && axios.get(`http://localhost:3004/stores/${userId}`)
            .then((response) => setUserData(response.data))
            .catch((error) => console.log('No se pudo recibir informacion del Restaurante', error))
    }, [userId])
    
	return isSignedIn ? <main className="main-container">

        <div className='banner'>
            <div className='roundProfile'>
                <img src={userData?.image} className="img-restaurant" width={300} height={300} alt="" />
            </div>
        </div>
        <div>
            <h1 className='titleRestaurant'>{userData?.name}</h1>
            <h2>{userData?.description}</h2>
        </div>

        

        <div>
            <h2>Mis Productos</h2>
        </div>

        <Link to='/createProduct' 
        className='crearPizza'>Crear Pizza</Link>
        
        <div className='products'>
            {userData?.products.map((product) => (
                <MyProductsCard
                name={product.name}
                price={product.price}
                rating={product.rating}
                image={product.image}
                key={product._id}
                id={product._id}
              />
            ))}
        </div>
    </main> : navigate('/home')

}   