import './CreateProduct.css'
import axios from 'axios'
//axios.defaults.baseURL = "https://pfcaromio-production.up.railway.app/"
import { useEffect, useState } from 'react'
import validate from './validation'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
//import CreatableSelect from 'react-select/creatable'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '@clerk/clerk-react'
import Swal from 'sweetalert2';
import styled from 'styled-components';

import validate from './validation'

export default function FormProduct({ visible, userData, product, setActiveTab, setUserData }) {

    const { userId } = useAuth();

    const [image, setImage] = useState(null);
    const action = visible === 'createProduct' ? 'crear' : visible === 'editProduct' ? 'editar' : '';
    const options = [{ value: 'pepperoni', label: 'pepperoni' }]

    const [selectOptions, setSelectOptions] = useState([options])
    const [productData, setProductData] = useState({
        UserStoreId: '',
        name: '',
        price: '',
        description: '',
        stock: 0,
        rating: 0,
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

    //se crea el estado que tendrá la imagen temporalmente y el de la URL  
    const [currentImage, setCurrentImage] = useState();
    const [currentURL, setCurrentUrl] = useState("");

    // Obtengo valores del select y los seteo en ProductData
    const handleSelect = (newValue) => {
        setSelectOptions(newValue)
        setProductData({ ...productData, tags: newValue })
    }
    // Obtengo valores de los inputs
    const handleChange = (event) => {
        setProductData({ ...productData, [event.target.name]: event.target.value })
        setErrors(
            validate({ ...productData, [event.target.name]: event.target.value, image: event.target.value })
        )
    }

    const handleChangeImage = (e) => {

        if (e.target.files[0]) {
            setCurrentImage(e.target.files[0])
            setImage(URL.createObjectURL(e.target.files[0]));
            console.log(e.target.files[0])
        }
    }

    // Se envia el POST con el submit
    const handleSubmit = (event) => {
        event.preventDefault()
        // Se itera por todos los posibles errores
        const hasErrors = Object.values(errors).some((error) => error !== "")

        // Se valida que no haya ningun error en el form
        if (!hasErrors) {
            action === 'crear' && createProduct(productData)
            action === 'editar' && updateProduct(productData)
        } else {
            Swal.fire({
                title: 'Error. Por favor rellena bien los campos de tu Pizza',
                icon: 'error',
            })
        }
    }

    const createProduct = async (productData) => {
        try {
            const newUrl = await subirImagen(currentImage)
            productData.image = newUrl;
            productData.UserStoreId = userId;

            const newProduct = await axios.post(`${BACKEND_URL}products`, productData)
            Swal.fire({
                title: `El producto ${newProduct.name} creado con éxito`,
                icon: 'success'
            })

            setActiveTab('dataTable');
            updateList();

        } catch (error) {
            Swal.fire({ title: 'Error. Por favor intenta de nuevo', icon: 'error' })
        }
    }
    // Función para subir imagen a cloudinary y obtener url para usar en el productData.
    const subirImagen = async (currentImage) => {
        try {
            const formData = new FormData();
            formData.append("file", currentImage);
            formData.append("upload_preset", "vp72qx31");
            Swal.showLoading();
            const { data } = await axios.post("https://api.cloudinary.com/v1_1/dfsjn09oo/image/upload", formData);
            setCurrentUrl(data.secure_url);
            return data.secure_url;

        } catch (error) {
            console.log('No se pudo obtener el link de la imagen: ' + error)
        }
    }

    const updateList = () => {
        axios.get(`${BACKEND_URL}users/${userId}`)
            .then(({ data }) => {
                if (data.length > 0) {
                    setUserData(data[0])
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const updateProduct = async (productData) => {
        try {
            const update = await axios.put(`${BACKEND_URL}products/${productData._id}`, productData)
            console.log('Producto actualizado')
            console.log(update);
            updateList()
            Swal.fire({
                title: 'Producto actualizado con Exito',
                icon: 'success'
            })
            setActiveTab('dataTable');
        } catch (error) {
            Swal.fire({ title: 'Error. Por favor intenta de nuevo', icon: 'error' })
        }
    }

    useEffect(() => {

        if (action === 'editar') {
            setProductData(product)
            setImage(product.image)
        }
        if (action === 'crear') {
            setProductData(
                {
                    UserStoreId: '',
                    name: '',
                    price: '',
                    description: '',
                    stock: '',
                    rating: '',
                    tags: [],
                    image: ''
                }
            );
            setImage(null)
        }
    }, [action])

    return (
        <>
            <Container style={{ display: visible === 'createProduct' || visible === 'editProduct' ? '' : 'none' }}>
                <header>
                    <TitleL> {userData.username}, vamos a {action} tu pizza </TitleL>
                </header>
                <Form action="">
                    <FomrContent>
                        <tbody>
                            <Item>
                                <LabelHead className='labels'>Nombre de tu Pizza:</LabelHead>
                                <ColInputs>
                                    <input type="text" name='name' value={productData.name} onChange={handleChange} />
                                    <label className='warning-Text'>{errors.name}</label>
                                </ColInputs>
                            </Item>
                            <Item>
                                <LabelHead className='labels'>Describe tu Pizza:</LabelHead>
                                <ColInputs>
                                    <textarea rows="4" name='description' value={productData.description} onChange={handleChange}></textarea>
                                    <label className='warning-Text'>{errors.description}</label>
                                </ColInputs>
                            </Item>
                            <Item>
                                <LabelHead className='labels'>Precio de tu Pizza (USD):</LabelHead>
                                <ColInputs>
                                    <input type="number" name='price' value={productData.price} onChange={handleChange} />
                                    <label className='warning-Text'>{errors.price}</label>
                                </ColInputs>
                            </Item>
                            <Item>
                                <LabelHead className='labels'>Stock:</LabelHead>
                                <ColInputs>
                                    <input type="number" name='stock' value={productData.stock} onChange={handleChange} />
                                    <label className='warning-Text'>{errors.stock}</label>
                                </ColInputs>
                            </Item>
                            <Item>
                                <LabelHead className='labels'>Rating:</LabelHead>
                                <ColInputs>
                                    <input type="number" name='rating' value={productData.rating} onChange={handleChange} />
                                    <label className='warning-Text'>{errors.rating}</label>
                                </ColInputs>
                            </Item>
                            <Item>
                                <LabelHead className='labels'>Imagen de tu pizza:</LabelHead>
                                <ColInputs>
                                    <input type="file" name='image' onChange={handleChangeImage} />
                                </ColInputs>
                            </Item>
                            <Item>
                                <LabelHead className='labels'>Así se vé tu pizza:</LabelHead>
                                <ColInputs className='last'>
                                    {image && (
                                        <img
                                            src={image}
                                            alt="Preview"
                                        />
                                    )}
                                </ColInputs>
                            </Item>

                            <Item>
                                <LabelHead className='labels'></LabelHead>
                                <ColInputs className='footer'>
                                    <input type='submit' title='guardar' value="Guardar" onClick={handleSubmit} />
                                </ColInputs>
                            </Item>
                        </tbody>
                    </FomrContent>
                </Form>
            </Container>
        </>
    )
}


const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: gray;
    
    header{
        text-align: center;
    }
`;

const Form = styled.form`
    position: relative;
    border: 0px dashed red;
    width: 80%;
    display: flex;
    flex-direction: column;
    padding: 1rem;

    input{
        box-sizing: border-box;
        width: 100%;
        font-size: 1rem;
        padding: 5px;
        background-color: #EEE;
        border: 0px solid gray;
        border-radius: 5px;
        color: black;
        outline: none;
        padding: 0.5rem;
        &:focus{
            outline:1px solid orange;
            background-color: #E2E2E2;
        }
        
    }

    textarea{
        box-sizing: border-box;
        width: 100%;
        resize: none;
        font-size: 1rem;
        padding: 5px;
        background-color: #EEE;
        border: 0px solid gray;
        border-radius: 5px;
        color: black;
        outline: none;
        padding: 0.5rem;
        &:focus{
            outline:1px solid orange;
            background-color: #E2E2E2;
        }
        
    }
    
    table{
        border-spacing: 8px;
    }

    table > tbody > tr > th {
        width: 25%;
        font-weight: 500;
        text-align: start;
    }
    table > tbody > tr > td.last{
        border-bottom:3px solid #DDD;
        text-align: center;
    }

    table > tbody > tr > td.footer {
        text-align: center;
        
        input[type=submit]{
            background-color: orange;
            border-radius: 8px;
            border: 1px solid transparent;
            padding: 0.6em 1.2em;
            font-size: 1em;
            font-weight: 500;
            font-family: inherit;
            cursor: pointer;
            transition: border-color 0.25s;
            width: fit-content;
            color:black;
            margin: 10px 10px;
            &:hover{
                background-color: #474747;
                color:white;
            }
        }

    }
    img{
        max-width: 300px;
    }
`;

const TitleName = styled.div`
    font-size: 1.2rem;
    font-weight: 500;
`;

const TitleL = styled.div`
    font-size: x-large;
`;

const Item = styled.tr``;
const LabelHead = styled.th``;
const FomrContent = styled.table``;
const ColInputs = styled.td``;