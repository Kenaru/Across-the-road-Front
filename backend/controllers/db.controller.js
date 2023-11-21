const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Middleware pour parser les données JSON
app.use(bodyParser.json());

// Connexion à la base de données SQLite
const db = require('../config/db');

// Endpoint pour la connexion
app.post(`${apiURL}/api/post/login`, (req, res) => {
    const { mail, password } = req.body;

    // Vérifier les informations d'identification dans la base de données
    // (Assurez-vous d'utiliser une bibliothèque de hachage sécurisée comme bcrypt)
    const query = `SELECT * FROM Users WHERE mail = ? AND password = ?`;
    db.get(query, [mail, password], (err, user) => {
        if (err) {
            console.error('Erreur lors de la requête:', err);
            return res.status(500).json({ success: false, message: 'Erreur du serveur' });
        }

        if (user) {
            // Mettre à jour la colonne is_logged_in dans la table users
            db.run(`UPDATE Users SET is_logged_in = 1 WHERE user_id = ?`, [user.user_id], (err) => {
                if (err) {
                    console.error('Erreur lors de la mise à jour de la session:', err);
                    return res.status(500).json({ success: false, message: 'Erreur du serveur' });
                }

                // Login réussi
                return res.json({ success: true });
            });
        } else {
            // Login échoué
            return res.json({ success: false, message: 'Identifiants incorrects' });
        }
    });
});

// Endpoint pour la vérification de l'état de connexion
app.get(`${apiURL}/api/get/isLoggedIn/:userId`, (req, res) => {
    const userId = req.params.userId;

    // Vérifier l'état de connexion dans la base de données
    db.get(`SELECT is_logged_in FROM Users WHERE user_id = ?`, [userId], (err, user) => {
        if (err) {
            console.error('Erreur lors de la requête:', err);
            return res.status(500).json({ success: false, message: 'Erreur du serveur' });
        }

        if (user) {
            // Renvoyer l'état de connexion
            return res.json({ success: true, isLoggedIn: user.is_logged_in });
        } else {
            return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
        }
    });
});

// Écoute du serveur sur le port spécifié
app.listen(port, () => {
    console.log(`Serveur en écoute sur le port ${port}`);
});
