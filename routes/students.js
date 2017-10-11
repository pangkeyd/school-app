const express = require('express')
const router = express.Router()
const Models = require('../models')

function cekRole(req, res, next){
	if(req.session && req.session.hasOwnProperty('username') && req.session.role === 'teacher' || req.session.role === 'academic' || req.session.role === 'headmaster'){
		console.log(req.session)
		next()
	}else{
		res.redirect('/')
	}
}

router.get('/', cekRole, function(req, res){
	Models.Student.findAll()
	.then(function(students){
		let sess = req.session
		res.render('students', {
			data: students,
			dataMenu: `${sess.role}`,
			dataErr: null,
			title: 'Students Page'
		})
	})
})

router.get('/add', function(req, res){
	res.render('studentsAdd', {
		dataErr: null,
		title: 'Add Student Page'
	})
})

router.post('/add', function(req, res){
	Models.Student.create({
		first_name: `${req.body.fn}`,
		last_name: `${req.body.ln}`,
		email: `${req.body.email}`
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

router.get('/edit/:id', function(req, res){
	Models.Student.findAll({
		where: {
			id: req.params.id
		}
	})
	.then(function(student){
		res.render('studentsEdit', {
			data: student[0],
			dataErr: null,
			title: 'Edit Student Page'
		})
	})
})

router.post('/edit/:id', function(req, res){
	Models.Student.update({
		first_name: `${req.body.fn}`,
		last_name: `${req.body.ln}`,
		email: `${req.body.email}`
	},
	{
		where: {
			id: req.params.id
		}
	})
	.then(function(){
		res.redirect('/students')
	})
	.catch(function(err){
		Models.Student.findAll({
			where: {
				id: req.params.id
			}
		})
		.then(function(student){
			res.render('studentsEdit', {
				data: student[0],
				dataErr: err,
				title: 'Edit Student Page'
			})
		})
	})
})

router.get('/delete/:id', function(req, res){
	Models.Student.destroy({
		where: {
			id: req.params.id
		}
	})
	.then(function(){
		res.redirect('/students')
	})
})

// Add Subject di Student

router.get('/subject/:id', function(req, res){
	Models.Student.findAll({
		where: {
			id: req.params.id
		}
	})
	.then(function(student){
		Models.Subject.findAll()
		.then(function(subjects){
			res.render('subjectAddStud', {
				dataStu: student[0],
				dataSub: subjects,
				dataErr: null,
				title: 'Add Subject Student Page'
			})
		})
	})
})

// subjectID must be unique

router.post('/subject/:id', function(req, res){
	Models.StudentSubject.create({
		studentID: req.params.id,
		subjectID: req.body.subjectName
	})
	.then(function(){
		res.redirect('/students')
	})
	.catch(function(err){
		// let error = null
		// if(err.errors = 'subjectID must be unique'){
		// 	error = 'This Student already take this Subject!'
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
		// 				dataErr: error,
		// 				title: 'Add Subject Student Page'
		// 			})
		// 		})
		// 	})
		// }
		res.send(err)
	})
})

module.exports = router
