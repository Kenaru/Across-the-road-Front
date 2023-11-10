// controllers/get.controller.js
const db = require('../config/db');

exports.getCountAssoWebsite = async (req, res) => {
  try {
    // Exécutez la requête SQL pour compter les lignes dans la table AssoWebsite
    const [results] = await db.query('SELECT COUNT(*) AS nbrAssoWebsite FROM AssoWebsite');

    // Renvoyer les résultats en tant que JSON
    res.json(results[0]); // Assurez-vous de renvoyer le premier résultat (premier élément du tableau) si disponible
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).send('Erreur du serveur');
  }
};

exports.getCountUsers = async (req, res) => {
  try {
    // Exécutez la requête SQL pour compter les lignes dans la table AssoWebsite
    const [results] = await db.query('SELECT COUNT(*) AS nbrUser FROM Users');

    // Renvoyer les résultats en tant que JSON
    res.json(results[0]); // Assurez-vous de renvoyer le premier résultat (premier élément du tableau) si disponible
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error);
    res.status(500).send('Erreur du serveur');
  }
};
