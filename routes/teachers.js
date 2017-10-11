const express = require('express')
const router = express.Router()
const Models = require('../models')

function cekRole(req, res, next){
	if(req.session && req.session.hasOwnProperty('username') && req.session.role === 'headmaster'){
		next()
	}else{
		res.redirect('/')
	}
}

router.get('/', cekRole, function(req, res){
	Models.Teacher.findAll({
		include: [{
			model: Models.Subject
		}]
	})
	.then(function(teachers){
		Models.Subject.findAll()
		.then(function(subjects){
			res.render('teachers', {
				dataTea: teachers,
				dataSub: subjects,
				dataErr: null,
				title: 'Teachers Page'
			})
		})
	})
})

router.post('/', function(req, res){
	let subjectID = req.body.subjectName
	if(subjectID){
		Models.Teacher.create({
			first_name: `${req.body.fn}`,
			last_name: `${req.body.ln}`,
			email: `${req.body.email}`,
			subjectID: `${subjectID}`
		})
		.then(function(){
			res.redirect('/teachers')
		})
		.catch(function(err){
			res.send(err)
		})
	}else{
		Models.Teacher.create({
			first_name: `${req.body.fn}`,
			last_name: `${req.body.ln}`,
			email: `${req.body.email}`,
			subjectID: null
		})
		.then(function(){
			res.redirect('/teachers')
		})
		.catch(function(err){
			Models.Teacher.findAll({
				include: [{
					model: Models.Subject
				}]
			})
			.then(function(teachers){
				Models.Subject.findAll()
				.then(function(subjects){
					res.render('teachers', {
						dataTea: teachers,
						dataSub: subjects,
						dataErr: err,
						title: 'Teachers Page'
					})
				})
			})
		})
	}
})

router.get('/edit/:id', function(req, res){
	Models.Teacher.findAll({
		where: {
			id: req.params.id
		},
		include: [{
			model: Models.Subject
		}]
	})
	.then(function(teachers){
		Models.Subject.findAll()
		.then(function(subjects){
			res.render('teachersEdit', {
				dataTea: teachers[0],
				dataSub: subjects,
				dataErr: null,
				title: 'Edit Teachers Page'
			})
		})
	})
})

router.post('/edit/:id', function(req, res){
	let subjectID = req.body.subjectName
	if(subjectID){
		Models.Teacher.update({
			first_name: `${req.body.fn}`,
			last_name: `${req.body.ln}`,
			email: `${req.body.email}`,
			subjectID: `${subjectID}`
		},
		{
			where: {
				id: req.params.id
			}
		})
		.then(function(){
			res.redirect('/teachers')
		})
		.catch(function(err){
			Models.Teacher.findAll({
				include: [{
					model: Models.Subject
				}],
				where: {
					id: req.params.id
				}
			})
			.then(function(teachers){
				Models.Subject.findAll()
				.then(function(subjects){
					res.render('teachersEdit', {
						dataTea: teachers[0],
						dataSub: subjects,
						dataErr: err,
						title: 'Edit Teachers Page'
					})
				})
			})
		})
	}else{
		Models.Teacher.update({
			first_name: `${req.body.fn}`,
			last_name: `${req.body.ln}`,
			email: `${req.body.email}`,
			subjectID: null
		},
		{
			where: {
				id: req.params.id
			}
		})
		.then(function(){
			res.redirect('/teachers')
		})
		.catch(function(err){
			Models.Teacher.findAll({
				include: [{
					model: Models.Subject
				}],
				where: {
					id: req.params.id
				}
			})
			.then(function(teachers){
				Models.Subject.findAll()
				.then(function(subjects){
					res.render('teachersEdit', {
						dataTea: teachers[0],
						dataSub: subjects,
						dataErr: err,
						title: 'Edit Teachers Page'
					})
				})
			})
		})
	}
})

router.get('/delete/:id', function(req, res){
	Models.Teacher.destroy({
		where: {
			id: req.params.id
		}
	})
	.then(function(){
		res.redirect('/teachers')
	})
})

module.exports = router
