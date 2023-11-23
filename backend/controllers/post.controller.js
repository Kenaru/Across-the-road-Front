const db = require('../config/db');

exports.login_user = async (req, res) => {
    const { mail, password } = req.body;
    
    try {
        // Utilisation du pool pour exécuter les requêtes
        const [rows] = await db.query('SELECT * FROM Users WHERE mail = ? AND password = ?', [mail, password]);
        if (rows.length > 0) {
            // L'utilisateur existe, les détails sont corrects
            await db.query('UPDATE Users SET is_logged_in = 1 WHERE mail = ?', [mail]);
            const loginTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
            await db.query('INSERT INTO sessions (user_id, login_time, logout_time) VALUES (?, ?, DATE_ADD(?, INTERVAL 12 HOUR))', [rows[0].id, loginTime, loginTime]);
    
            res.status(200).json({ success: true, message: 'Login successful' });
        } else {
            // Aucun utilisateur trouvé avec les détails fournis
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

    } catch (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.register_user = async (req, res) => {
    const { mail, lastname, firstname, birthday, phonenumber, password, confirmPassword } = req.body;

    try {
        // Procéder à l'inscription sans vérifications temporaires
        await db.query('INSERT INTO Users SET ?', { mail, lastname, firstname, birthday, phonenumber, password, reset_token: null, reset_token_expires: null });

        res.status(201).json({ success: true, message: 'Inscription réussie', targetDiv: 'respons' });
    } catch (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error', targetDiv: 'respons' });
    }
};

exports.logout_user = async (req, res) => {
    const userId = req.body.userId; // Assurez-vous de recevoir l'ID de l'utilisateur depuis la requête
    console.log(userId);
    try {
        // Mettre à jour la valeur is_logged_in dans la table Users pour marquer l'utilisateur comme déconnecté
        await db.query('UPDATE Users SET is_logged_in = 0 WHERE id = ?', [userId]);

        // Supprimer toutes les lignes de la table sessions correspondant à l'ID de l'utilisateur
        await db.query('DELETE FROM sessions WHERE user_id = ?', [userId]);

        res.status(200).json({ success: true, message: 'Utilisateur déconnecté avec succès' });
    } catch (error) {
        console.error('Erreur lors de la déconnexion de l\'utilisateur:', error);
        res.status(500).json({ success: false, message: 'Erreur du serveur lors de la déconnexion' });
    }
};
