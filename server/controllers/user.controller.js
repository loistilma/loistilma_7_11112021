const db = require('../database/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { ErrorHandler } = require('../helpers/error.helper')

exports.get = async (req, res, next) => {
    try {
        const user = await db.User.findOne({
            where: { id: req.params.id, id: req.UserId },
            attributes: ['username', 'email']
        })
        if (!user) throw new ErrorHandler(400, 'Utilisateur non trouvé !')
        res.status(201).json(user)
    } catch (error) {
        console.log(error)
        //console.log('err.name', err.name)
        //console.log('err.message', err.message)
        //console.log('err.errors', err.errors)
        //err.errors.map(e => console.log(e.message))
        next(error)
    }
}

exports.delete = async (req, res, next) => {
    try {
        const user = await db.User.findOne({ where: { id: req.params.id, id: req.UserId } })
        if (!user) throw new ErrorHandler(400, 'Utilisateur non trouvé !')
        await user.destroy()
        return res.status(200).json({ message: "Utilisateur supprimé(e)" })

    } catch (error) {
        next(error)
    }
}
