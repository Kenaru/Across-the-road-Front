const db = require('../config/db'); // Importez votre module de connexion à la base de données
const nodemailer = require('nodemailer');
const crypto = require('crypto');

exports.forgotpassword = async (req, res) => {
    const { mail } = req.body;

    try {
        // Vérifiez si l'utilisateur existe dans la base de données
        const user = await db.query('SELECT * FROM Users WHERE mail = ?', [mail]);

        if (!user || user.length === 0) {
            return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
        }

        // Générez un token de réinitialisation de mot de passe
        const resetToken = crypto.randomBytes(20).toString('hex');

        // Stockez le token dans la base de données avec une expiration (par exemple, 1 heure)
        await db.query('UPDATE Users SET reset_token = ?, reset_token_expires = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE mail = ?', [resetToken, mail]);

        const transporter = nodemailer.createTransport({
            host: 'http://mail.acrosstheroad.fr',
            port: 2079,
            // secure: true, // true for 465, false for other ports
            auth: {
                user: 'ne-pas-repondre@acrosstheroad.fr',
                pass: '!_NPR_AcrossTheRoad_2023!Mail_!',
            },
        });
        

        // Construisez le lien de réinitialisation avec le token
        const resetLink = `http://localhost:5000/reset-password?token=${resetToken}`;

        // Envoyez l'e-mail de réinitialisation
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
