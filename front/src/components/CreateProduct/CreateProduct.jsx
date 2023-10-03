import './CreateProduct.css'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'
import { useState } from 'react'
import validate from './validation'
import CreatableSelect from 'react-select/creatable'
export default function CreateProduct () {

    const {isAuthenticated, getIdTokenClaims} = useAuth0()
   

    // Con este handler obtengo el id del usuario 
    const handleIDUser = async() => {
        if (isAuthenticated) {
            const userToken = await getIdTokenClaims()
            const userID = userToken.sub
            return userID;
        }
    }
    
    // Obtengo valores del select y los seteo en ProductData
    const handleSelect = (newValue) => {
        setSelectOptions(newValue)
        setProductData({...productData, tags: newValue})
    }
    // Obtengo valores de los inputs
    const handleChange = (event) => {
        setProductData({...productData, [event.target.name]: event.target.value})
        setErrors(
            validate({...productData, [event.target.name]: event.target.value})
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
            alert('Error. Por favor rellena bien los campos de tu Pizza')
        }
        
    }
    const options = [{value: 'pepperoni', label: 'pepperoni'}]

    const [selectOptions, setSelectOptions] = useState([options])
    const [productData, setProductData] = useState({
        name: '',
        price: '',
        description: '',
        storeID: '',
        stock: 0,
        rating: '',
        tags: []
    })

    const [errors, setErrors] = useState({
        name: '',
        price: '',
        description: '',
        storeID: '',
        stock: 0,
        rating: '',
        tags: []
    })

    const createProduct = async(productData) => {
            try {
                const id = await handleIDUser()
                productData = {...productData, storeID: id}
                // const create = await axios.post('localhost:3001/products/', productData)
                console.log(productData);
            } catch (error) {
                alert('Error. Por favor intenta de nuevo')
            }
            
        
    }



    return(<div className='createSection'>
        <div>
            <h1>Agregar tu Producto</h1>
            <h2>Vamos a crear tu Pizza!</h2>
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

            <label>Etiquetas: </label>
            <CreatableSelect isMulti options={selectOptions} onChange={handleSelect} placeholder='Categoria...'/>
            
            <button type='submit' onClick={handleSubmit}>Crear</button>
        </form>

        <div>
            
        </div>
    </div>
    )
}