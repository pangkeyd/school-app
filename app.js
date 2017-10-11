const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Models = require('./models')
const session = require('express-session')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Session

app.use(session({
	secret: 'pangkeyd',
	resave: false,
	saveUninitialized: true
}))

// Routing
const login = require('./routes/login')
// const signup = require('./routes/signUp')
const index = require('./routes/index')
const teachers = require('./routes/teachers')
const subjects = require('./routes/subjects')
const students = require('./routes/students')

app.use('/login', login)
// app.use('/sign-up', signup)
app.use('/', index)
app.use('/teachers', teachers)
app.use('/subjects', subjects)
app.use('/students', students)

app.listen(3000, function(){
	console.log(`AYO JALAN!`)
})
