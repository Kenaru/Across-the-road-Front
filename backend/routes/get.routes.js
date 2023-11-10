// routes/get.routes.js
const express = require('express');
const router = express.Router();
const getController = require('../controllers/get.controller');

// Définir les routes pour les requêtes qui commencent par /api/get

// Exemple de route pour récupérer le compte de la table AssoWebsite
router.get('/countAssoWebsite', getController.getCountAssoWebsite);
router.get('/UsersCount', getController.getCountUsers);

// Ajoutez d'autres routes selon vos besoins...

module.exports = router;
