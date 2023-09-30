const { Users } = require('../db');

// Obtener todos los usuarios
const getAllUsers = async () => {
    try {
        return await Users.find();
    } catch (err) {
        console.log(err);
    }
};

// Obtener un usuario por su ID
const getUserById = async (userId) => {
    try {
        return await Users.findById(userId).populate('reviews');
    } catch (err) {
        console.log(err);
    }
};

// Crear un nuevo usuario
const createUser = async (name, phone, address, city, dob, role) => {
    try {
        const newUser = new Users({
            name: name,
            phone: phone,
            address: address,
            city: city,
            dob: dob,
            role: role,
        });

        await newUser.save();
        return newUser;
        
    } catch (err) {
        console.log(err);
    }
};

module.exports = { 
    getAllUsers,
    getUserById,
    createUser 
};