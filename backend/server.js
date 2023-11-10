const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Chemin vers votre fichier de configuration de la base de données
const get = require('./routes/get.routes'); // Chemin vers votre fichier de routes
const post = require('./routes/post.routes'); // Chemin vers votre fichier de routes

const app = express();
const port = 5000;

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes et autres configurations...
app.use('/api/get', get);
app.use('/api/post', post);

// Lancer le serveur
app.listen(port, () => console.log('Le serveur fonctionne sur le port ' + port));
console.log('Lien de connexion au serveur http://127.0.0.1:5500');