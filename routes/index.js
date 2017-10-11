const express = require('express')
const router = express.Router()
const Models = require('../models')

function cekSession1(req, res, next){
	if(req.session && req.session.hasOwnProperty('username') && req.session.hasOwnProperty('role')){
		next()
	}else{
		res.redirect('/login')
	}
}

router.get('/', cekSession1, function(req, res){
	// console.log(req.session.role)
	let sess = req.session
	res.render('index', {
		dataMenu: `${sess.role}`,
		title: 'Home Page'
	})
})

router.get('/logout', function(req, res){
	req.session.destroy(function(err){
		if(!err){
			res.redirect('/login')
		}else{
			res.send(err)
		}
	})
})

module.exports = router
