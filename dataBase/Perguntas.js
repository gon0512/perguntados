const Sequelize = require('sequelize')
const connection = require('./database')

const Perguntas = connection.define('perguntas', {
	nome: {
		type: Sequelize.STRING,
		allowNull: false
	},
	titulo: {
		type: Sequelize.STRING,
		allowNull: false
	},
	pergunta: {
		type: Sequelize.TEXT,
		allowNull: false
	}
})

Perguntas.sync({force: false})

module.exports = Perguntas