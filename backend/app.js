// Importation d EXPRESS, framework de NODE.JS
const express = require('express');

// Gere la demande POST de l'application frontend
const bodyParser = require('body-parser');

// Importation de MONGOOSE pour connexion à la base de donnée MONGO DB
const mongoose = require('mongoose');

// Importation de la route dédiée aux sauces
const saucesRoutes = require('./routes/sauce');

// Importation de la route dédiée aux utilisateurs
const userRoutes = require('./routes/user');

// Donne accès au chemin de notre système de fichier "images"
const path = require('path');

// utilisation DOTENV pour masquer les informations de connexion à la base de données à l'aide de variables d'environnement
require('dotenv').config();


// Connexion à la base de donnée avec MONGOOSE
mongoose.connect('mongodb+srv://fred-2b:8578Mongo@cluster0.sjbzc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Application EXPRESS
const app = express();

// Middleware HEADER evite les erreurs de securité CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permet d'accéder à notre API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Ajoute les headers mentionnés aux requêtes envoyées vers notre API 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Permet les méthodes autorisées pour les requêtes HTTP
    next();
});


//Transforme les données POST en objet JSON
app.use(bodyParser.json());

// Midleware qui permet de charger les fichiers qui sont dans le repertoire images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Va servir les routes dédiées aux sauces
app.use('/api/sauces', saucesRoutes);

// Va servir les routes dédiées pour l'authentification des utilisateurs
app.use('/api/auth', userRoutes);


// Exporte EXPRESS dans server.js
module.exports = app;