const express = require('express')
const router = express.Router()
const Models = require('../models')

router.get('/', function(req, res){
  res.render('login', {
    title: 'Login Page'
  })
})

router.post('/', function(req, res){
  Models.User.findAll({
    where: {
      username: req.body.user,
      password: req.body.pass
    }
  })
  .then(function(user){
    // res.send(user)
    if(user){
      req.session.username = user[0].username
      req.session.role = user[0].role
      res.redirect('/')
    }else{
      res.send('Tidak terdaftar')
    }
  })
})

module.exports = router
