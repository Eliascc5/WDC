import express from 'express';
import {dirname} from  'path';
import {fileURLToPath} from 'url';
import bodyParser from 'body-parser';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;  

// Body parser - Middleware
app.use(bodyParser.urlencoded({ extended: true }));

function autenticate(req, res, next) {
  const password = req.body.password;
  if (password === 'myPasswordTest') {
    next(); // Continue to the next middleware or route handler
  } else {
    res.sendFile(__dirname + '/public/index.html'); // Redirect to the initial form
  }
}
app.use(autenticate);


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/check', (req, res) => {
  res.sendFile(__dirname + '/public/secret.html'); 
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
