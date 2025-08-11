//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

//First solution proposed; 

import express from 'express';
import {dirname} from  'path';
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;  

// Middleware para leer datos de formularios
app.use(express.urlencoded({ extended: true }));


// Ruta para servir el formulario HTML (puedes servirlo con sendFile o un motor de plantillas)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/check', (req, res) => {
  const password = req.body.password;
  if (password === 'myPasswordTest') {
    res.sendFile(__dirname + '/public/secret.html'); // Devuelve la pagina de secretos
  } else {
    res.sendFile(__dirname + '/public/index.html');  // Redirige al formulario incial
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

