require('dotenv').config();
var mongoose = require('mongoose');
const { MONGO_URI } = process.env

async function conn() {
  await mongoose
    .connect(MONGO_URI)
    .then(() => console.log('Base de datos: Caro mio', 'online'))
    .catch((e) => console.log('Error de conexion ', e));
}

module.exports = { conn };
