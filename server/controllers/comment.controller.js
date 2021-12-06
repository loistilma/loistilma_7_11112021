const db = require('../database/models')
const { ErrorHandler } = require('../helpers/error.helper')


exports.get = async (req, res, next) => {
    try {
        const comments = await db.Comment.findAll({ where: { PostId: req.params.id } })
        if (!comments) throw new ErrorHandler(404, 'Erreur lors de la récupération des commentaires')
        res.status(200).json(comments)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.create = async (req, res, next) => {
    try {
        await db.Comment.create({
            content: req.body.content,
            PostId: req.params.id,
            UserId: req.UserId
        })
        res.status(201).json({ message: 'Commentaire créé !' })
    } catch (error) {
        console.log(error)
        next(new ErrorHandler(400, 'Erreur lors de la création du commentaire'))
    }
}

exports.delete = async (req, res, next) => {
    try {
        const comment = req.isModerator
            ? await db.Comment.findOne({ where: { PostId: req.params.postId, id: req.params.commentId } })
            : await db.Comment.findOne({ where: { PostId: req.params.postId, id: req.params.commentId, UserId: req.UserId } })
        //console.log(comment)
        if (!comment) throw new ErrorHandler(401, 'Commentaire non trouvé')
        await comment.destroy()
        res.status(200).json({ message: 'Commentaire supprimé !' })
    } catch (error) {
        console.log(error)
        next(error)
    }
}