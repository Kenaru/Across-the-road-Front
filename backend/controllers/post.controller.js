// Assurez-vous que votre fichier db.js contient la configuration de connexion à la base de données
const db = require('../config/db');

exports.login_user = async (req, res) => {
    const { mail, password } = req.body;

    try {
        // Utilisation de la méthode query pour permettre les requêtes préparées
        const [rows] = await db.query('SELECT * FROM Users WHERE Mail = ? AND Password = ?', [mail, password]);

        if (rows.length > 0) {
            // L'utilisateur existe, les détails sont corrects
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
    const { mail, lastName, firstName, birthday, phoneNumber, password } = req.body;

    try {
        // Vous devriez utiliser une méthode de hachage sécurisée comme bcrypt pour stocker les mots de passe
        // Cela est une version simplifiée pour illustrer le processus
        const [rows] = await db.query('INSERT INTO users (Mail, LastName, FirstName, Birthday, PhoneNumber, Password) VALUES (?, ?, ?, ?, ?, ?)', [mail, lastName, firstName, birthday, phoneNumber, password]);

        res.status(201).json({ success: true, message: 'Inscription réussie' });
    } catch (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
