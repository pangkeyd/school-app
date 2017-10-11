const express = require('express')
const router = express.Router()
const Models = require('../models')

router.get('/', function(req, res){
  res.render('signUp', {
    title: 'Sign Up Page'
  })
})

router.post('/', function(req, res){
  Models.User.create({
    username: `${req.body.user}`,
    password: `${req.body.pass}`
  })
  .then(function(){
    res.redirect('/login')
  })
})

module.exports = router
