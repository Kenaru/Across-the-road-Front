// Importez le module 'mysql'
const mysql = require('mysql');

// Créez une connexion à la base de données
const connection = mysql.createConnection({
  host: 'localhost',  // Adresse de votre base de données
  user: 'biau7663_acrosstheroad', // Nom d'utilisateur
  password: 'FTQkmTg4T1OHwCCcp0', // Mot de passe
  database: 'biau7663_acrosstheroad' // Nom de la base de données
});

// Connectez-vous à la base de données
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données : ' + err.stack);
    return;
  }
  console.log('Connecté à la base de données en tant qu ID ' + connection.threadId);
});

// Vous pouvez maintenant effectuer des opérations sur la base de données

// Lorsque vous avez terminé, n'oubliez pas de fermer la connexion
connection.end((err) => {
  if (err) {
    console.error('Erreur lors de la déconnexion de la base de données : ' + err.stack);
    return;
  }
  console.log('Déconnecté de la base de données');
});
