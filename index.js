const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./dataBase/database.js');
const Perguntas = require('./dataBase/Perguntas.js');
const Respostas = require('./dataBase/Respostas.js');

connection.authenticate().then(() => {
	console.log('DataBase Connected!');
}).catch(err => {
	console.log('Erro:', err);
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	Perguntas.findAll({raw: true, order: [
		['id', 'DESC']
	]}).then(perguntas => {
		res.render('index', {
			perguntas: perguntas
		});
	});
});


app.get('/perguntar', (req, res) => {
	res.render('perguntar');
});

app.post('/perguntar', (req, res) => {
	let nome = req.body.nome
	let titulo = req.body.titulo
	let pergunta = req.body.pergunta
	
	Perguntas.create({
		nome: nome,
		titulo: titulo,
		pergunta: pergunta
	}).then(() => {
		res.redirect('/');
	});
});

app.get('/responder/:id', (req, res) => {
	let id = req.params.id
	
	Perguntas.findOne({
		where: {id: id}
	}).then(resposta => {
		if(resposta != undefined){
			res.render('responder', {
				resposta: [resposta]
			});
		}
		else{
			res.redirect('/');
		}
	});
});

app.post('/resposta', (req, res) => {
	let autor = req.body.autor
	let mensagem = req.body.mensagem
	let id = req.body.pergunta

	Respostas.create({
		nome: autor,
		resposta: mensagem,
		idPergunta: id
	}).then(() => {
		res.redirect('/')
	}).catch(err => {
		console.log('Erro:', err)
	})
})

app.get('/respostas', (req, res) => {
	Perguntas.findAll({raw: true, order: [
		['id', 'DESC']
	]}).then(perguntas => {
		res.render('respostas', {
			perguntas: perguntas
		});
	});
});

app.get('/verRespostas/:id', (req, res) => {
	let id = req.params.id

	Perguntas.findOne({
		where: {id: id}
	}).then(pergunta => {
		if(pergunta != undefined){

			Respostas.findAll({
				where: {idPergunta: pergunta.id}
			}).then(respostas => {
				res.render('verRespostas', {
					pergunta: [pergunta],
					respostas: respostas
				})
			})
		}
		else{
			res.redirect('/')
		}
	})
})


app.listen(3000, () => {
	console.log('Server listening at Localhost:3000')
})