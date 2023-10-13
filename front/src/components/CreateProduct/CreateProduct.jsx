import './CreateProduct.css'
import axios from 'axios'
import { useState } from 'react'
import validate from './validation'
import CreatableSelect from 'react-select/creatable'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import Swal from 'sweetalert2'
export default function CreateProduct () {

    const navigate = useNavigate()
    const {userId} = useAuth()

    // Obtengo valores del select y los seteo en ProductData
    const handleSelect = (newValue) => {
        setSelectOptions(newValue)
        setProductData({...productData, tags: newValue})
    }
    // Obtengo valores de los inputs
    const handleChange = (event) => {
        setProductData({...productData, [event.target.name]: event.target.value})
        setErrors(
            validate({...productData, [event.target.name]: event.target.value, image: event.target.value})
        )
    }
    // Se envia el POST con el submit
    const handleSubmit = (event) => {
        event.preventDefault()
        // Se itera por todos los posibles errores
        const hasErrors = Object.values(errors).some((error) => error !== "")

        // Se valida que no haya ningun error en el form
        if (!hasErrors) {
            createProduct(productData)
        } else {
            Swal.fire({title: 'Error. Por favor rellena bien los campos de tu Pizza',
        icon: 'error',})
        }
        
    }
    const options = [{value: 'pepperoni', label: 'pepperoni'}]

    const [selectOptions, setSelectOptions] = useState([options])
    const [productData, setProductData] = useState({
        UserStoreId: '',
        name: '',
        price: '',
        description: '',
        stock: '',
        rating: '',
        tags: [],
        image: '' 
    });
    
    const [errors, setErrors] = useState({
        UserStoreId: '',
        name: '',
        price: '',
        description: '',
        stock: '',
        rating: '',
        tags: [],
        image: ''
    });

    const createProduct = async(productData) => {
            try {
                productData.UserStoreId = userId
                const create = await axios.post('http://localhost:3004/products', productData)
                Swal.fire({title: 'Producto Creado con Exito', 
            icon: 'success'})
                navigate('/home')
                console.log('Producto creado')
                console.log(productData);
            } catch (error) {
                Swal.fire({title: 'Error. Por favor intenta de nuevo', icon: 'error'})
            }
            
        
    }



    return(<div className='createSection'>
        <div>
            <h1>Agregar tu Producto</h1>
            <h2>Vamos a crear tu Pizza!</h2>

            <Link to='/home' className='cancelar-button'>Cancelar</Link>
        </div>
        <form className='container-form'>
            <label>Nombre de tu Pizza: </label>
            <input type="text" name='name'onChange={handleChange}/>
            <label className='warning-Text'>{errors.name}</label>

            <label>Describe tu Pizza: </label>
            <input type="text" name='description' onChange={handleChange}/>
            <label className='warning-Text'>{errors.description}</label>

            <label>Precio: (USD)</label>
            <input type="text" name='price'onChange={handleChange}/>
            <label className='warning-Text'>{errors.price}</label>

            <label>Cantidad: (Unidades)</label>
            <input type="text" name='stock'onChange={handleChange}/>
            <label className='warning-Text'>{errors.stock}</label>

            <label>Rating: </label>
            <input type="text" name='rating'onChange={handleChange}/>
            <label className='warning-Text'>{errors.rating}</label>

            <label>URL de la imagen:</label>
            <input type="text" name="image" onChange={handleChange} />
            <label className="warning-Text">{errors.image}</label>

            <label>Etiquetas: </label>
            <CreatableSelect isMulti options={selectOptions} onChange={handleSelect} placeholder='Categoria...'/>
            
            <button type='submit' onClick={handleSubmit}>Crear</button>
        </form>

        <div>
            
        </div>
    </div>
    )
}