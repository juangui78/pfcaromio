import './RegisterForm.css'
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useAuth, useUser } from '@clerk/clerk-react'
import validate from './validation';
import Swal from 'sweetalert2'
export default function RegisterForm() {

  const {userId} = useAuth()
  const {user} = useUser()
  const navigate = useNavigate()

  const options = [
    {value: 'store', label: 'Restaurante'},
    {value: 'user', label: 'Cliente'},
  ]

  const [selectOption, setSelectOption] = useState(null)
  const [registerFormRestaurant, setRegisterFormRestaurant] = useState({
    userIdentifier: '',
    name: '',
    address: '',
    description: '',
    rating: '',
    revenue: '',

  })

  const [errors, setErrors] = useState({
    name: '',
    address: '',
    description: '',
    rating: '',
    revenue: '',
  })

  const handleChange = (event) => {
    setRegisterFormRestaurant({...registerFormRestaurant, [event.target.name]: event.target.value})
    setErrors(
        validate({...registerFormRestaurant, [event.target.name]: event.target.value})
    )
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    // Se itera por todos los posibles errores
    const hasErrors = Object.values(errors).some((error) => error !== "")

    // Se valida que no haya ningun error en el form
    if (!hasErrors) {
        createStore(registerFormRestaurant)
        navigate('/home')
        
    } else {
        Swal.fire({title: 'Error. Por favor rellena bien los campos de tu Restaurante', icon: 'error'})
    }
    
  }


  const createStore = async(registerFormRestaurant) => {
    try {
      
      
      const userInfo = {
        userIdentifier: userId,
        username: user.username ? user.username : user.firstName,
        email: user.primaryEmailAddress.emailAddress,
        role: 'Buyer'
      }

      if (selectOption.value === 'store') {
        registerFormRestaurant.userIdentifier = userId
        userInfo.role = 'Seller'
        console.log(userInfo);
        const create = await axios.post('http://localhost:3004/stores', registerFormRestaurant)
        const createRestaurantUser = await axios.post('http://localhost:3004/users', userInfo)
        Swal.fire({title: 'Tienda Creada con Exito', icon: 'success'})
        console.log('store creada')
        return
      }

      console.log(userInfo);
      const create = await axios.post('http://localhost:3004/users', userInfo)
      Swal.fire({title: 'Usuario Creado con Exito', icon: 'success'})
      
      
      console.log('usuario creado')
     
      
    } catch (error) {
        console.log(error);
    }
    
  }

    return (
    <div className='allSection'>
        <h1>Crear tu Cuenta!</h1>
        <form className='container-form-register'>
          <div className='form-contain'>
            <label>Que tipo de usuario eres?</label>
            <Select options={options} value={selectOption} onChange={setSelectOption} placeholder='Selecciona uno...'/>
            
            {selectOption && selectOption.value === 'store' ? (
              <div className='restaurant-form'>
                <label>Nombre de tu Restaurante: </label>
                <input type="text" name='name'onChange={handleChange}/>
                <label className='warning-Text'>{errors.name}</label>

                <label>Descripcion de tu Restaurante: </label>
                <input type="text" name='description'onChange={handleChange}/>
                <label className='warning-Text'>{errors.description}</label>

                <label>Direccion: </label>
                <input type="text" name='address' onChange={handleChange}/>
                <label className='warning-Text'>{errors.address}</label>

                <label>Imagen de tu Restaurante: </label>
                <input type="text" name='image' onChange={handleChange}/>

                <label>Rating: </label>
                <input type="text" name='rating' onChange={handleChange}/>
              </div>
            ) : null}
            
           


            <button type='submit' onClick={handleSubmit}>Crear!</button>
          </div>
        </form>
    </div>
  )

}