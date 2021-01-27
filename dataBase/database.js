const Sequelize = require('sequelize')

const connection = new Sequelize('perguntados', 'root', 'layon051328', {
	host: 'localhost',
	dialect: 'mysql'
})

module.exports = connection