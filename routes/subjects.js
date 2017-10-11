const express = require('express')
const router = express.Router()
const Models = require('../models')

function cekRole(req, res, next){
	if(req.session && req.session.hasOwnProperty('username') && req.session.role === 'headmaster' || req.session.role === 'academic'){
		next()
	}else{
		res.redirect('/')
	}
}

router.get('/', cekRole, function(req, res){
	Models.Subject.findAll({
		include: [{
			model: Models.Teacher
		}]
	})
	.then(function(subjects){
		let sess = req.session
		res.render('subjects', {
			dataSub: subjects,
			dataErr: null,
			dataMenu: `${sess.role}`,
			title: 'Subjects Page'
		})
	})
})

router.post('/', function(req, res){
	Models.Subject.create({
		subject_name: `${req.body.sn}`
	})
	.then(function(){
		res.redirect('/subjects')
	})
	.catch(function(err){
		Models.Subject.findAll({
			include: [{
				model: Models.Teacher
			}]
		})
		.then(function(subjects){
			let sess = req.session
			res.render('subjects', {
				dataSub: subjects,
				dataErr: err,
				dataMenu: `${sess.role}`,
				title: 'Subjects Page'
			})
		})
	})
})

router.get('/edit/:id', function(req, res){
	Models.Subject.findAll({
		where: {
			id: req.params.id
		}
	})
	.then(function(subject){
		res.render('subjectEdit', {
			dataSub: subject[0],
			dataErr: null,
			title: 'Edit Subject Page'
		})
	})
})

router.post('/edit/:id', function(req, res){
	Models.Subject.update({
		subject_name: `${req.body.sn}`
	},
	{
		where: {
			id: req.params.id
		}
	})
	.then(function(){
		res.redirect('/subjects')
	})
	.catch(function(err){
		Models.Subject.findAll({
			where: {
				id: req.params.id
			}
		})
		.then(function(subject){
			res.render('subjectEdit', {
				dataSub: subject[0],
				dataErr: err,
				title: 'Edit Subject Page'
			})
		})
	})
})

router.get('/delete/:id', function(req, res){
	Models.Subject.destroy({
		where: {
			id: req.params.id
		}
	})
	.then(function(){
		res.redirect('/subjects')
	})
})

// Enrolled Student di Subject

router.get('/enrolledstudents/:id', function(req, res){
	Models.StudentSubject.findAll({
		attributes: ['id', 'studentID', 'subjectID', 'score'],
		include: [
			{model: Models.Student},
			{model: Models.Subject}
		],
		where: {
			subjectID: req.params.id
		}
	})
	.then(function(stusub){
		res.render('enrolledStudents', {
			data: stusub,
			title: 'Enrolled Students Page'
		})
	})
})

router.get('/:subjectID/:studentID/give-score', function(req, res){
	Models.StudentSubject.findAll({
		include: [
			{model: Models.Student},
			{model: Models.Subject}
		],
		where: {
			subjectID: req.params.subjectID,
			studentID: req.params.studentID
		}
	})
	.then(function(stusub){
		res.render('givescore', {
			data: stusub,
			title: 'Give Score Student Page'
		})
	})
})

router.post('/:subjectID/:studentID/give-score', function(req, res){
	let subID = req.params.subjectID
	Models.StudentSubject.update({
		score: req.body.score
	},
	{
		where: {
			subjectID: `${subID}`,
			studentID: req.params.studentID
		}
	})
	.then(function(){
		res.redirect(`/subjects/enrolledstudents/${subID}`)
	})
})

router.get('/enrolledstudents/delete/:subjectID/:studentID', function(req, res){
	let subID = req.params.subjectID
	Models.StudentSubject.destroy({
		where: {
			studentID: req.params.studentID,
			subjectID: `${subID}`
		}
	})
	.then(function(){
		res.redirect(`/subjects/enrolledstudents/${subID}`)
	})
})

module.exports = router
