// Endpoint pour obtenir la liste des utilisateurs connectés
app.get('/api/get/connectedUsers', (req, res) => {
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
app.get('/api/get/disconnectedUsers', (req, res) => {
    // Récupérer les utilisateurs déconnectés depuis la base de données
    db.all(`SELECT user_id, mail FROM Users WHERE is_logged_in = 0`, (err, users) => {
        if (err) {
            console.error('Erreur lors de la requête:', err);
            return res.status(500).json({ success: false, message: 'Erreur du serveur' });
        }

        return res.json({ success: true, disconnectedUsers: users });
    });
});

document.getElementById('login-status').innerText = 'Connecté';