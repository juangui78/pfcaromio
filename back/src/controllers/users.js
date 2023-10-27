const {User}  = require('../models/user');

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
        if (userId.startsWith("user_")) return await User.findOne({userIdentifier: userId});
        else return await User.findById(userId);
    } catch (err) {
        console.log(err);
    }
};

// Crear un nuevo usuario
const createUser = async (username, email, age, role, userIdentifier) => {
    try {
        // console.log('id entrando + ' + idUser);
        const newUser = new User({
            
            username: username,
            email:email,
            age: age,
            role: role,
            userIdentifier: userIdentifier,
        });
        console.log(newUser);
        await newUser.save()
            .then((result) => {
                console.log('Usuario guardado con éxito:', result, 'usuario: ', newUser) ;
            })
            .catch((error) => {
                console.error('Error al guardar el usuario:', error, 'usuario: ', newUser);
            });
        return newUser;
        
    } catch (err) {
        console.log(err);
    }
};

const toggleEnabled = async (userIdentifier) => {
    try {
        const user = await User.findOne({ userIdentifier: userIdentifier })

        if (!user) {
            console.log("usuario no encontrado");
            return;
        }

        user.enabled = !user.enabled;

        await user.save();

        console.log(`'enabled' para el usuario ${userIdentifier} ha sido cambiado a ${user.enabled}`);
        return user
    } catch (error) {
        console.error('Error al cambiar el estado de "enabled":', error);
    }
};

module.exports = { 
    getAllUsers,
    getUserById,
    createUser,
    toggleEnabled 
};