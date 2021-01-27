const Sequelize = require('sequelize')
const connection = require('./dataBase')

const Respostas = connection.define('respostas', {
	nome: {
		type: Sequelize.STRING,
		allowNull: false
	},
	resposta: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	idPergunta: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
})

Respostas.sync({force: false})

module.exports = Respostas