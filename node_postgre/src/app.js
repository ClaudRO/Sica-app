const express = require('express');
const dotenv= require('dotenv');
const cors = require('cors');


const port = process.env.PORT || 3000;
const routerApi = require('./routes');
/*const { verifyToken } = require('./controllers/usuarios.controller');*/
const cajerosRoutes = require('./routes/cajero.routes');
/*const corsOptions = {
  origin: 'https://localhost:8100',
  optionsSuccessStatus: 200
};*/

dotenv.config();
const app = express();


app.use('/api', cajerosRoutes);

app.use(cors());
app.use(express.json());

// Define una ruta de ejemplo
app.get('/', (req, res) => {
  /*res.json({ success: true, message: 'Ruta protegida' });*/
  res.send('¡Hola, mundo!');
});
routerApi(app);
// Inicia el servidor en el puerto especificado
app.listen(port, () => {
  console.log("Port ==> ", port);
});
