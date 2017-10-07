const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Models = require('./models')

app.set('view engine', 'ejs')

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

app.listen(3000, function(){
	console.log(`AYO JALAN!`)
})