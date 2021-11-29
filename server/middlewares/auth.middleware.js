const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    //console.log(token)
    if (!token) {
        res.status(401).send('Unauthorized: No token provided')
    } else {
        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token')
            } else {
                req.UserId = decoded.UserId
                req.isModerator = decoded.isModerator
                next()
            }
        })
    }
}