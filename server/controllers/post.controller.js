const db = require('../database/models')
const file = require('../services/upload.service')
const { ErrorHandler } = require('../helpers/error.helper')

exports.get = async (req, res, next) => {
    try{
        const posts = await db.Post.findAll({ include: db.User })
        if(!posts) throw new ErrorHandler(404, 'Erreur lors de la récupération des posts')
        res.status(200).json(posts)
    } catch(error) {
        next(error)
    }
}

exports.create = async (req, res, next) => {
    const serverUrl = `${req.protocol}://${req.get('host')}/`
    const imagePath = serverUrl + req.file.path
    //const newSauce = new Sauce({...JSON.parse(req.body.sauce), imageUrl: imagePath})


    try{
        await db.Post.create({
            title: req.body.title,
            description: req.body.description,
            file: imagePath,
            UserId: req.UserId
        })
        res.status(201).json({ message: 'Post créé !'})
    } catch (error) {
        console.log(error)
        next(new ErrorHandler(400, 'Erreur lors de la création du post'))
    }
}