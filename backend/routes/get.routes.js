// routes/get.routes.js
const express = require('express');
const router = express.Router();
const getController = require('../controllers/get.controller');

// Définir les routes pour les requêtes qui commencent par /api/get

// Exemple de route pour récupérer le compte de la table AssoWebsite
router.get('/countAssoWebsite', getController.getCountAssoWebsite);
router.get('/countAssoOnline', getController.getCountAssoOnline);
router.get('/UsersCount', getController.getCountUsers);
router.get('/CountprezOnline', getController.getprezOnline);
router.get('/AdminOnline', getController.getAdminOnline);

// Endpoint pour obtenir la liste des utilisateurs connectés
router.get('/api/get/connectedUsers', (req, res) => {
    // Récupérer les utilisateurs connectés depuis la base de données
    db.all(`SELECT user_id, mail FROM Users WHERE is_logged_in = 1`, (err, users) => {
        if (err) {
            console.error('Erreur lors de la requête:', err);
            return res.status(500).json({ success: false, message: 'Erreur du serveur' });
        }

        return res.json({ success: true, connectedUsers: users });
    });
});

// Endpoint pour obtenir la liste des utilisateurs déconnectés
router.get('/api/get/disconnectedUsers', (req, res) => {
    // Récupérer les utilisateurs déconnectés depuis la base de données
    db.all(`SELECT user_id, mail FROM Users WHERE is_logged_in = 0`, (err, users) => {
        if (err) {
            console.error('Erreur lors de la requête:', err);
            return res.status(500).json({ success: false, message: 'Erreur du serveur' });
        }

        return res.json({ success: true, disconnectedUsers: users });
    });
});

// Ajoutez d'autres routes selon vos besoins...

module.exports = router;
