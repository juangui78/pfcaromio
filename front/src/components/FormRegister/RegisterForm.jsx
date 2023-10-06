import './RegisterForm.css'
import Select from 'react-select';
import { useState } from 'react';
export default function RegisterForm() {

  const options = [
    {value: 'store', label: 'Restaurante'},
    {value: 'user', label: 'Cliente'},
  ]

  const [selectOption, setSelectOption] = useState(null)

  const [registerFormUser, setRegisterFormUser] = useState({
    // Por ahora no se necesita mas info del user
    // Quizas direccion y telefono
  })

  const [registerFormRestaurant, setRegisterFormRestaurant] = useState({
    name: '',
    address: '',
    description: '',
    rating: '',
    revenue: '',
    image: '',

  })

  const handleChange = (event) => {
    setRegisterFormRestaurant({...registerFormRestaurant, [event.target.name]: event.target.value})
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(registerFormUser);
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
                {/* <label className='warning-Text'>{errors.name}</label> */}

                <label>Descripcion de tu Restaurante: </label>
                <input type="text" name='description'onChange={handleChange}/>

                <label>Direccion: </label>
                <input type="text" name='address' onChange={handleChange}/>
                {/* <label className='warning-Text'>{errors.address}</label> */}

                <label>Imagen de tu Restaurante: </label>
                <input type="text" name='image' onChange={handleChange}/>
              </div>
            ) : null}
            
           


            <button type='submit' onClick={handleSubmit}>Crear!</button>
          </div>
        </form>
    </div>
  )

}