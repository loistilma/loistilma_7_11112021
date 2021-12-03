const db = require('../database/models')
const file = require('../services/upload.service')
const { ErrorHandler } = require('../helpers/error.helper')

exports.get = async (req, res, next) => {
    try {
        const posts = await db.Post.findAll({
            include: [
                {
                    model: db.User,
                    attributes: ['username', 'email']
                },
                {
                    model: db.Comment,
                    include: {
                        model: db.User,
                        attributes: ['username']
                    },
                }
            ],
            order: [
                ['createdAt', 'DESC'],
                [db.Comment, 'createdAt', 'DESC'],
            ]
        })
        //console.log(JSON.stringify(posts))
        if (!posts) throw new ErrorHandler(404, 'Erreur lors de la récupération des posts')
        res.status(200).json(posts)
    } catch (error) {
        next(error)
    }
}
/*
exports.getById = async (req, res, next) => {
    try {
        const post = await db.Post.findOne({ where: { id: req.params.id } })
        if (!post) throw new ErrorHandler(404, 'Erreur lors de la récupération du post')
        res.status(200).json(post)
    } catch (error) {
        next(error)
    }
}
*/
exports.create = async (req, res, next) => {
    const serverUrl = `${req.protocol}://${req.get('host')}/`
    const imagePath = req.file ? serverUrl + req.file.path : null

    try {
        await db.Post.create({
            title: req.body.title,
            description: req.body.description,
            file: imagePath,
            UserId: req.UserId
        })
        res.status(201).json({ message: 'Post créé !' })
    } catch (error) {
        console.log(error)
        next(new ErrorHandler(400, 'Erreur lors de la création du post'))
    }
}

exports.modify = async (req, res, next) => {
    const serverUrl = `${req.protocol}://${req.get('host')}/`

    try {
        const post = req.isModerator
            ? await db.Post.findOne({ where: { id: req.params.id } })
            : await db.Post.findOne({ where: { id: req.params.id, UserId: req.UserId } })

        if (!post) throw new ErrorHandler(401, 'Post non trouvé')
        const imagePath = req.file ? serverUrl + req.file.path : post.file
        if (post.file) file.del(post.file)
        post.title = req.body.title
        post.description = req.body.description
        post.file = imagePath
        post.UserId = req.UserId
        await post.save()
        res.status(201).json({ message: 'Post créé !' })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.delete = async (req, res, next) => {
    try {
        const post = req.isModerator
            ? await db.Post.findOne({ where: { id: req.params.id } })
            : await db.Post.findOne({ where: { id: req.params.id, UserId: req.UserId } })

        if (!post) throw new ErrorHandler(401, 'Post non trouvé')
        if (post.file) file.del(post.file)
        await post.destroy()
        res.status(200).json({ message: 'Post supprimé !' })
    } catch (error) {
        console.log(error)
        next(error)
    }
}