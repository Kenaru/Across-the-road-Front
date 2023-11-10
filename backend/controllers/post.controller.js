const db = require('../config/db');

exports.login_user = async (req, res) => {
        const { mail, password } = req.body;
      
        try {
          const [rows] = await connection.execute(
            'SELECT * FROM Users WHERE Mail = ? AND Password = ?',
            [mail, password]
          );
      
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
