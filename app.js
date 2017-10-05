const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Models = require('./models')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Home Page

app.get('/', function(req, res){
	res.render('index', {
		title: 'Home Page'
	})
})

// Teacher Page

app.get('/teachers', function(req, res){
	Models.Teacher.findAll()
	.then(function(teachers){
		res.render('teachers', {
			data: teachers,
			title: 'Teacher Page'
		})
	})
})

// Subject Page

app.get('/subjects', function(req, res){
	Models.Subject.findAll()
	.then(function(subjects){
		res.render('subjects', {
			data: subjects,
			title: 'Subject Page'
		})
	})
})

// Student Page

app.get('/students', function(req, res){
	Models.Student.findAll({
		order: [
			['id', 'DESC'],
			['first_name', 'DESC']
		]
	})
	.then(function(students){
		res.render('students', {
			data: students,
			title: 'Student Page'
		})
		// res.send(students[0].getFullName())
	})
})

app.get('/students/add', function(req, res){
	res.render('studentsAdd', {
		dataErr: null,
		title: 'Add Student Page'
	})
})

app.post('/students/add', function(req, res){
	Models.Student.create({
		first_name: `${req.body.fn}`,
		last_name: `${req.body.ln}`,
		email: `${req.body.email}`,
		createdAt: new Date()
	})
	.then(function(){
		res.redirect('/students')
	})
	.catch(function(err){
		res.render('studentsAdd', {
			dataErr: err,
			title: 'Add Student Page'
		})
	})
})

app.get('/students/edit/:id', function(req, res){
	Models.Student.findAll({
		where: {
			id: `${req.params.id}`
		}
	})
	.then(function(student){
		res.render('studentsEdit', {
			data: student[0],
			title: 'Edit Student Page'
		})
	})
})

app.post('/students/edit/:id', function(req, res){
	Models.Student.update({
		first_name: `${req.body.fn}`,
		last_name: `${req.body.ln}`,
		email: `${req.body.email}`
	},
	{
		where: {
			id : `${req.params.id}`
		}
	})
	.then(function(){
		res.redirect('/students')
	})
})

app.get('/students/delete/:id', function(req, res){
	Models.Student.destroy({
		where: {
			id: `${req.params.id}`
		}
	})
	.then(function(){
		res.redirect('/students')
	})
})

app.listen(3000, function(){
	console.log(`AYO JALAN!`)
})