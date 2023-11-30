const db = require('../config/db');
const crypto = require('crypto');

exports.login_user = async (req, res) => {
    const { mail, password } = req.body;

    try {
        // Utilisation du pool pour exécuter les requêtes
        const [rows] = await db.query('SELECT * FROM Users WHERE mail = ?', [mail]);
        if (rows.length > 0) {
            const user = rows[0];
            // Comparaison des mots de passe hachés
            const hashedPassword = hashPassword(password); // Hashage du mot de passe entré
            if (hashedPassword === user.password) {
                // L'utilisateur existe, les détails sont corrects
                await db.query('UPDATE Users SET is_logged_in = 1 WHERE mail = ?', [mail]);
                const loginTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
                await db.query('INSERT INTO sessions (user_id, login_time, logout_time) VALUES (?, ?, DATE_ADD(?, INTERVAL 12 HOUR))', [user.id, loginTime, loginTime]);

                res.status(200).json({ success: true, message: 'Login successful' });
            } else {
                // Mauvais mot de passe
                res.status(401).json({ success: false, message: 'Invalid username or password' });
            }
        } else {
            // Aucun utilisateur trouvé avec l'email fourni
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.register_user = async (req, res) => {
    const { mail, lastname, firstname, birthday, phonenumber, password, confirmPassword } = req.body;

    // Regex pour vérifier le mot de passe
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#°.£¤µ,?\\§;!ù%²$=%^~'\-`\/\[\]&*()_+{}|:<>?]).{8,}$/;

    try {
        if (!passwordRegex.test(password)) {
            // Le mot de passe ne correspond pas aux critères requis
            console.log(password);
            console.log(passwordRegex.test(password));
            return res.status(400).json({ success: false, message: 'Le mot de passe doit faire au moins 8 caractères et contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial.' });
        }

        if (password !== confirmPassword) {
            // Les mots de passe ne correspondent pas
            return res.status(400).json({ success: false, message: 'Les mots de passe ne correspondent pas.' });
        }

        // Hacher le mot de passe avec SHA-256
        const hashedPassword = hashPassword(password);
        
        // Procéder à l'inscription avec le mot de passe haché
        await db.query('INSERT INTO Users SET ?', { mail, lastname, firstname, birthday, phonenumber, password: hashedPassword, reset_token: null, reset_token_expires: null });

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

// Fonction pour hacher le mot de passe avec SHA-256
function hashPassword(password) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}
