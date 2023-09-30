const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createUser } = require('../controllers/users');

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
});

// Ruta para obtener un usuario por ID
router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await getUserById(userId);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(200).json(user); // Status 200 OK
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user' });
    }
});

// Ruta para crear un nuevo usuario
router.post('/', async (req, res) => {
    const { name, phone, address, city, dob, role } = req.body;

    try {
        const newUser = await createUser(name, phone, address, city, dob, role);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Error creating the user' });
    }
});

module.exports = router;
