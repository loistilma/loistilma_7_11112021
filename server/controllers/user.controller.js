const db = require('../database/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res, next) => {
    try {
        await db.User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        })
        res.status(201).json({ message: 'Vous êtes maintenant inscrit !' })
    } catch (err) {
        console.log(err)
        //console.log('err.name', err.name)
        //console.log('err.message', err.message)
        //console.log('err.errors', err.errors)
        //err.errors.map(e => console.log(e.message))
        //next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        const user = await db.User.findOne({ where: { username: req.body.username } })
        if (!user) throw new ErrorHandler(400, 'Utilisateur non trouvé !')

        bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
            if (err) return res.status(500).json({ message: 'Internal Server Error' })
            if (!isMatch) return res.status(401).json({ message: 'Mot de passe incorrect !' })
            const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
            return res
                .status(200)
                .json({ token: token, message: "Vous êtes maintenant connecté(e)" })
        })

    } catch (error) {
        next(error)
    }
}
