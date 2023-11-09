const express = require('express');
const db = require('./config/db'); // Chemin vers votre fichier de configuration de la base de données
const get = require('./routes/get.routes'); // Chemin vers votre fichier de routes

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes et autres configurations...
app.use('/api/get', get);

// Lancer le serveur
app.listen(port, () => console.log('Le serveur fonctionne sur le port ' + port));
