require('dotenv').config()
module.exports = {
	development: {
		username: process.env.DEV_DB_USERNAME,
		password: process.env.DEV_DB_PASSWORD,
		database: process.env.DEV_DB_DBNAME,
		host: process.env.DEV_DB_HOST,
		port: process.env.DEV_DB_PORT,
		dialect: "mysql",
		logging: false
	},
	test: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DBNAME,
		host: process.env.DB_HOST,
		dialect: "mysql"
	},
	production: {
		username: process.env.PROD_DB_USERNAME,
		password: process.env.PROD_DB_PASSWORD,
		database: process.env.PROD_DB_DBNAME,
		host: process.env.PROD_DB_HOST,
		dialect: "mysql"
	}
}