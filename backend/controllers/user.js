const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// MIDDLEWARE 
// HASH MOT DE PASSE BCRYPT/ NEW UTILISATEUR
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)  // 10 = nombres de tours
        .then(hash => {
            const user = new User({
                email:req.body.email,
                password: hash
            });
            user.save()
            .then(() => res.status(201).json({ message : 'Utilisateur crée !'}))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// CONNEXION UTILISATEUR ENREGISTRE
exports.login = (req, res, next) => {
    User.findOne({email: req.body.email}) // verification si email est dans bd
    .then(user =>{
        if(!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !'});
        }
        bcrypt.compare(req.body.password, user.password) //compare le password
            .then(valid => {
                if(!valid) {
                    return res.status(401).json({ error : 'Mot de passe incorrect !'});
                }
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(          // token securise compte utilisateur
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )
                });
            })
            .catch(error => res.status(500).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};