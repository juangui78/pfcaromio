require('dotenv').config();
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const port = process.env.PORT_SERVER || 3004;


try {
  conn().then(() =>{
    server.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  });

  console.log("Entra en el try")

} catch (error) {
  
  console.log("Error al levantar el server:", error );

}




