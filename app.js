const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Models = require('./models')

app.set('view engine', 'ejs')
// app.engine('ejs', require('hbs').__express)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Routing

const index = require('./routes/index')
const teachers = require('./routes/teachers')
const subjects = require('./routes/subjects')
const students = require('./routes/students')

app.use('/', index)
app.use('/teachers', teachers)
app.use('/subjects', subjects)
app.use('/students', students)

// ========== Subject Page ==========

// app.get('/subjects', function(req, res){
// 	Models.Subject.findAll({
// 		include: [
// 			{
// 				model: Models.Teacher
// 			}
// 		],
// 		order: [
// 			['id', 'DESC']
// 		]
// 	})
// 	.then(function(subjects){
// 		res.render('subjects', {
// 			dataSub: subjects,
// 			dataErr: null,
// 			title: 'Subject Page'
// 		})
// 	})
// 	.catch(function(err){
// 		res.send(err)
// 	})
// })

// app.post('/subjects', function(req, res){
// 	Models.Subject.create({
// 		subject_name: `${req.body.sn}`
// 	})
// 	.then(function(){
// 		res.redirect('/subjects')
// 	})
// 	.catch(function(err){
// 		Models.Subject.findAll({
// 			include: [{
// 				model: Models.Teacher
// 			}]
// 		})
// 		.then(function(subjects){
// 			res.render('subjects', {
// 				dataSub: subjects,
// 				dataErr: err,
// 				title: 'Subject Page'
// 			})
// 		})
// 	})
// })

// app.get('/subjects/edit/:id', function(req, res){
// 	Models.Subject.findAll({
// 		where: {
// 			id: req.params.id
// 		}
// 	})
// 	.then(function(subject){
// 		res.render('subjectEdit', {
// 			dataSub: subject[0],
// 			dataErr: null,
// 			title: 'Edit Subject Page'
// 		})
// 	})
// })

// app.post('/subjects/edit/:id', function(req, res){
// 	Models.Subject.update({
// 		subject_name: `${req.body.sn}`
// 	},
// 	{
// 		where: {
// 			id: req.params.id
// 		}
// 	})
// 	.then(function(){
// 		res.redirect('/subjects')
// 	})
// 	.catch(function(err){
// 		Models.Subject.findAll({
// 			where: {
// 				id: req.params.id
// 			}
// 		})
// 		.then(function(subjects){
// 			res.render('subjectEdit', {
// 				dataSub: subjects[0],
// 				dataErr: err,
// 				title: 'Edit Subject Page'
// 			})
// 		})
// 	})
// })

// app.get('/subjects/delete/:id', function(req, res){
// 	Models.Subject.destroy({
// 		where: {
// 			id: req.params.id
// 		}
// 	})
// 	.then(function(){
// 		res.redirect('/subjects')
// 	})
// })

// // Enrolled Students

// app.get('/subjects/enrolledstudents/:id', function(req, res){
// 	Models.StudentSubject.findAll({
// 		attributes: ['id', 'studentID', 'subjectID', 'score'],
// 		where: {
// 			subjectID: req.params.id
// 		},
// 		include: [
// 			{model: Models.Student},
// 			{model: Models.Subject}
// 		],
// 		order: [
// 			['id', 'DESC']
// 		]
// 	})
// 	.then(function(stusub){
// 		res.render('enrolledStudents', {
// 			data: stusub,
// 			title: 'Enrolled Students'
// 		})
// 		// res.send(stusub[0])
// 	})
// })

// app.get('/subjects/enrolledstudents/delete/:subjectID/:studentID', function(req, res){
// 	let subID = req.params.subjectID
// 	Models.StudentSubject.findAll({
// 		attributes: ['subjectID']
// 	})
// 	.then(function(){
// 		Models.StudentSubject.destroy({
// 			where: {
// 				studentID: req.params.studentID,
// 				subjectID: `${subID}`
// 			}
// 		})
// 		.then(function(){
// 			res.redirect(`/subjects/enrolledstudents/${subID}`)
// 		})
// 	})
// })

// app.get('/subjects/:subjectID/:studentID/give-score', function(req, res){
// 	Models.StudentSubject.findAll({
// 		attributes: ['id'],
// 		include: [
// 			{model: Models.Student},
// 			{model: Models.Subject}
// 		],
// 		where: {
// 			subjectID: req.params.subjectID,
// 			studentID: req.params.studentID
// 		}
// 	})
// 	.then(function(stusub){
// 		res.render('givescore', {
// 			data: stusub,
// 			title: 'Give Score'
// 		})
// 	})
// })

// app.post('/subjects/:subjectID/:studentID/give-score', function(req, res){
// 	Models.StudentSubject.update({
// 		score: `${req.body.score}`
// 	},
// 	{
// 		where: {
// 			studentID: req.params.studentID,
// 			subjectID: req.params.subjectID
// 		}
// 	})
// 	.then(function(){
// 		res.redirect(`/subjects/enrolledstudents/${req.params.subjectID}`)
// 	})
// })



// ========== Student Page ==========

// app.get('/students', function(req, res){
// 	Models.Student.findAll({
// 		order: [
// 			['id', 'DESC'],
// 			['first_name', 'DESC']
// 		]
// 	})
// 	.then(function(students){
// 		res.render('students', {
// 			data: students,
// 			title: 'Student Page'
// 		})
// 	})
// })

// app.get('/students/add', function(req, res){
// 	res.render('studentsAdd', {
// 		dataErr: null,
// 		title: 'Add Student Page'
// 	})
// })

// app.post('/students/add', function(req, res){
// 	Models.Student.create({
// 		first_name: `${req.body.fn}`,
// 		last_name: `${req.body.ln}`,
// 		email: `${req.body.email}`,
// 		createdAt: new Date()
// 	})
// 	.then(function(){
// 		res.redirect('/students')
// 	})
// 	.catch(function(err){
// 		res.render('studentsAdd', {
// 			dataErr: err,
// 			title: 'Add Student Page'
// 		})
// 	})
// })

// app.get('/students/edit/:id', function(req, res){
// 	Models.Student.findAll({
// 		where: {
// 			id: `${req.params.id}`
// 		}
// 	})
// 	.then(function(student){
// 		res.render('studentsEdit', {
// 			data: student[0],
// 			dataErr: null,
// 			title: 'Edit Student Page'
// 		})
// 	})
// })

// app.post('/students/edit/:id', function(req, res){
// 	Models.Student.update({
// 		first_name: `${req.body.fn}`,
// 		last_name: `${req.body.ln}`,
// 		email: `${req.body.email}`
// 	},
// 	{
// 		where: {
// 			id : `${req.params.id}`
// 		}
// 	})
// 	.then(function(){
// 		res.redirect('/students')
// 	})
// 	.catch(function(err){
// 		Models.Student.findAll({
// 			where: {
// 				id: `${req.params.id}`
// 			}
// 		})
// 		.then(function(student){
// 			res.render('studentsEdit', {
// 				data: student[0],
// 				dataErr: err,
// 				title: 'Edit Student Page'
// 			})
// 		})
// 	})
// })

// app.get('/students/delete/:id', function(req, res){
// 	Models.Student.destroy({
// 		where: {
// 			id: `${req.params.id}`
// 		}
// 	})
// 	.then(function(){
// 		res.redirect('/students')
// 	})
// })

// // Subject di Student

// app.get('/students/subject/:id', function(req, res){
// 	Models.Student.findAll({
// 		where: {
// 			id: req.params.id
// 		}
// 	})
// 	.then(function(student){
// 		Models.Subject.findAll()
// 		.then(function(subjects){
// 			res.render('subjectAddStud', {
// 				dataStu: student[0],
// 				dataSub: subjects,
// 				title: 'Add Student to Subject'
// 			})
// 			// res.send(student)
// 		})
// 	})
// })

// app.post('/students/subject/:id', function(req, res){
// 	Models.StudentSubject.create({
// 		studentID: req.params.id,
// 		subjectID: req.body.subjectName
// 	})
// 	.then(function(){
// 		res.redirect('/students')
// 	})
// 	.catch(function(err){
// 		res.send(err)
// 	})
// })

app.listen(3000, function(){
	console.log(`AYO JALAN!`)
})