const mysql = require('mysql2');

const connectDB = mysql.createConnection({
    host: '109.234.165.230', // Adresse de votre base de données
    user: 'biau7663_acrosstheroad',
    password: 'FTQkmTg4T1OHwCCcp0',
    database: 'biau7663_acrosstheroad',
});

connectDB.connect((err) => {
    if (err) {
      console.error('Erreur de connexion à la base de données MySQL : ' + err.message);
    } else {
      console.log('Connecté à la base de données MySQL');
    }
  });
module.exports = connectDB.promise();