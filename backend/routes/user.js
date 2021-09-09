// Création du routeur avec Express
const express = require('express');

// On crée un routeur avec la méthode d'EXPRESS
const router = express.Router();

// CONTROLLERS qui associe les fonctions aux différentes routes
const userCtrl = require('../controllers/user');

// Routes POST pour les informations fournies par le frontend
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Exportation du routeur vers app.js
module.exports = router;