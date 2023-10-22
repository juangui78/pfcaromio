export default function validate(productData) {
    const errors = {}

    const REGEXNUMBERSONSTRING = /\d/

    if (!productData.name) {
        errors.name = 'Por favor indica un nombre para tu Pizza'
    } else if (REGEXNUMBERSONSTRING.test(productData.name)) {
        errors.name = 'No pueden ir numeros en el nombre'
    } else if (productData.name.length > 40) {
        errors.name = 'Se permite un maximo de 40 Caracteres'
    }

    if (!productData.price || productData.price < 0) {
        errors.price = 'Por favor indica un valor para tu Pizza'
    } 

    if (!productData.description) {
        errors.description = 'Por favor describe tu Pizza'
    } else if (productData.description.length < 10 || productData.description.length > 300  ) {
        errors.description = 'Se permite un min de 10 Caracteres y un max de 300 Caracteres'
    }

    if (!productData.stock || productData.stock < 0) {
        errors.stock = 'Por favor ingresa un Stock valido'
    }

    if (productData.rating < 0 || productData.rating > 10) {
        errors.rating = 'El rango de rating es de 1 - 10'
    } 

    return errors;

}