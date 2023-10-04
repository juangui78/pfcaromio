const { User } = require('../models/user');

// Obtener todos los usuarios
const getAllUsers = async () => {
    try {
        return await User.find();
    } catch (err) {
        console.log(err);
    }
};

// Obtener un usuario por su ID
const getUserById = async (userId) => {
    try {
        return await User.findById(userId);
    } catch (err) {
        console.log(err);
    }
};

// Crear un nuevo usuario
const createUser = async (username ,email ,age, role) => {
    try {
        const newUser = new User({
            username: username,
            email:email,
            age: age,
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