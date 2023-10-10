export default function validate (RegisterFormRestaurant) {
    const errors = {}; 

    if (!RegisterFormRestaurant.name) {
        errors.name = 'Por favor ingrese el nombre del restaurante'
    } else if (RegisterFormRestaurant.name.length < 3) {
        errors.name = 'El nombre del restaurante debe tener al menos tres caracteres'
    } else if (RegisterFormRestaurant.name.length > 30) {
        errors.name = 'El nombre del restaurante debe tener menos de 30 caracteres'
    }

    if (!RegisterFormRestaurant.description) {
        errors.description = 'Por favor ingrese una descripcion'
    } else if (RegisterFormRestaurant.description.length > 300) {
        errors.description = 'La descripcion debe tener menos de 300 caracteres'
    }

    if (!RegisterFormRestaurant.address) {
        errors.address = 'Por favor ingrese una direccion'
    }

    return errors
}