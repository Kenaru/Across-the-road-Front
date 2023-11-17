const db = require('../config/db');

exports.login_user = async (req, res) => {
    const { mail, password } = req.body;
    
    try {
        // Utilisation du pool pour exécuter les requêtes
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
    const { mail, lastName, firstName, birthday, phoneNumber, password, confirmPassword } = req.body;

    try {
        // Vérifier si le mail est déjà utilisé
        const [existingUsers] = await db.query('SELECT * FROM users WHERE Mail = ?', [mail]);

        if (existingUsers.length > 0) {
            // Le mail est déjà enregistré
            return res.status(400).json({ success: false, message: 'Mail déjà enregistré', targetDiv: 'respons' });
        }

        // Vérifier que les mots de passe correspondent
        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: 'Les mots de passe ne correspondent pas', targetDiv: 'respons' });
        }

        // Vérifier que le mot de passe fait au moins 12 caractères
        if (password.length < 12) {
            return res.status(400).json({ success: false, message: 'Le mot de passe doit faire au moins 12 caractères', targetDiv: 'respons' });
        }

        // Vérifier si le numéro de téléphone est déjà utilisé
        const [existingPhoneNumbers] = await db.query('SELECT * FROM users WHERE PhoneNumber = ?', [phoneNumber]);

        if (existingPhoneNumbers.length > 0) {
            // Le numéro de téléphone est déjà utilisé
            return res.status(400).json({ success: false, message: 'Numéro de téléphone déjà utilisé', targetDiv: 'respons' });
        }

        // Le mail et le numéro de téléphone ne sont pas encore utilisés, procéder à l'inscription
        await db.query('INSERT INTO users (Mail, LastName, FirstName, Birthday, PhoneNumber, Password) VALUES (?, ?, ?, ?, ?, ?)', [mail, lastName, firstName, birthday, phoneNumber, password]);

        res.status(201).json({ success: true, message: 'Inscription réussie', targetDiv: 'respons' });
    } catch (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error', targetDiv: 'respons' });
    }
};

