const db = require('../database/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { ErrorHandler } = require('../helpers/error.helper')

exports.register = async (req, res, next) => {
    try {
        await db.User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        })
        res.status(201).json({ message: 'Vous êtes inscrit !' })
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
        const checkPassword = await bcrypt.compare(req.body.password, user.password)
        if (!checkPassword) throw new ErrorHandler(401, 'Mot de passe incorrect !')

        const token = jwt.sign(
            { 
                UserId: user.id,
                isModerator: user.isModerator,
            
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_EXPIRE }
        )

        return res.status(200).json({ token: token, user: user.id, isModerator: user.isModerator, message: "Vous êtes connecté(e)" })

    } catch (error) {
        next(error)
    }
}
