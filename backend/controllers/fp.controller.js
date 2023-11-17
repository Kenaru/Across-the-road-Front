const db = require('../config/db');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

exports.forgotpassword = async (req, res) => {
    const { mail, confirmmail } = req.body;

    try {
        // Vérification des adresses e-mail et correspondance
        if (!mail || !mail.trim()) {
            return res.status(400).json({ success: false, message: 'Adresse e-mail invalide' });
        }

        if (mail !== confirmmail) {
            return res.status(400).json({ success: false, message: 'Les adresses e-mail ne correspondent pas' });
        }

        // Vérification que l'adresse e-mail existe dans la base de données
        const userExists = await checkUserExists(mail);

        if (!userExists) {
            return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
        }

        // Génération du token de réinitialisation
        const resetToken = crypto.randomBytes(20).toString('hex');

        // Stockage du token dans la base de données avec expiration (par exemple, 1 heure)
        await db.query('UPDATE Users SET reset_token = ?, reset_token_expires = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE mail = ?', [resetToken, mail]);

        // Construisez le lien de réinitialisation avec le token
        const resetLink = `http://127.0.0.1:5500/frontend/Home/Connexion/reset-password/reset-password.html?token=${resetToken}`;

        // Envoyez l'e-mail de réinitialisation
        const transporter = nodemailer.createTransport({
            host: 'jojoba.o2switch.net', // Adresse du serveur SMTP (exemple pour Gmail)
            port: 587, // Port du serveur SMTP (587 pour TLS, 465 pour SSL)
            secure: false, // true pour 465, false pour d'autres ports
            auth: {
                user: 'ne-pas-repondre@acrosstheroad.fr', // Votre adresse e-mail
                pass: '!_NPR_AcrossTheRoad_2023!Mail_!', // Votre mot de passe
            },
            tls: {
                rejectUnauthorized: false, // Nécessaire si votre serveur SMTP utilise un certificat auto-signé
            },
        });


        await transporter.sendMail({
            from: 'ne-pas-repondre@acrosstheroad.fr',
            to: mail,
            subject: 'Réinitialisation de mot de passe',
            text: `Cliquez sur le lien suivant pour réinitialiser votre mot de passe : ${resetLink}`,
            html: `<p>Cliquez sur le lien suivant pour réinitialiser votre mot de passe : <a href="${resetLink}">${resetLink}</a></p>`,
        });

        res.status(200).json({ success: true, message: 'E-mail de réinitialisation envoyé avec succès' });
    } catch (error) {
        console.error('Error sending reset email:', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
    }
};

async function checkUserExists(mail) {
    const result = await db.query('SELECT COUNT(*) AS count FROM Users WHERE mail = ?', [mail]);
    return result[0][0].count > 0; // Accéder correctement à la valeur de count
}

exports.reset_password = async (req, res) => {
    const { token, password, confirmPassword } = req.body;

    try {
        // Vérification des mots de passe et correspondance
        if (!password || !password.trim()) {
            return res.status(400).json({ success: false, message: 'Mot de passe invalide' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: 'Les mots de passe ne correspondent pas' });
        }

        // Vérification du token de réinitialisation
        const user = await checkResetToken(token);

        if (!user) {
            return res.status(401).json({ success: false, message: 'Token invalide ou expiré' });
        }

        // Réinitialisation du mot de passe et suppression du token
        await db.query('UPDATE Users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?', [password, user.id]);

        res.status(200).json({ success: true, message: 'Mot de passe réinitialisé avec succès' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
    }
};

