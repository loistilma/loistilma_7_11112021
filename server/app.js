var express = require('express')
var path = require('path')
var cors = require('cors')
const cookieParser = require('cookie-parser')
const { handleError } = require('./helpers/error.helper')

require('dotenv').config()
//require('./config/db.config')()

var usersRouter = require('./routes/user.route')
//var postsRouter = require('./routes/post.route')

var app = express()
app.use(cookieParser())
app.use(cors({
	origin: process.env.CORS_ORIGIN,
	credentials: true,
	exposedHeaders: ["set-cookie"],
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/auth', usersRouter)
//app.use('/api/posts', postsRouter)

app.use((err, req, res, next) => {
	console.log(err)
	res.status(400).json({ message: err })
})

module.exports = app
