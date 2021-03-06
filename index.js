var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');

var app = express();

/*
var logger = function(req, res, next){
	console.log('Logging...');
	next();
}

app.use(logger);
*/

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')))

// Express Validator Middleware
app.use(expressValidator());

var users = [
	
	{
		id: 1,
		first_name: 'John',
		last_name: 'Doe',
		email: 'johndoe@gmail.com',

	},
	{
		id: 2,
		first_name: 'Mary',
		last_name: 'Joe',
		email: 'maryjoe@gmail.com',

	},
	{
		id: 3,
		first_name: 'Dave',
		last_name: 'East',
		email: 'daveeast@gmail.com',

	}

]

app.get('/', function(req, res){
	res.render('index', {
		title: 'Customers',
		users: users
	});
});

app.post('/users/add', function(req, res){

	req.checkBody('first_name', 'First Name is Required').notEmpty();
	req.checkBody('last_name', 'Last Name is Required').notEmpty();
	req.checkBody('email', 'Email is Required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render('index', {
			title: 'Customers',
			users: users,
			errors: errors
	});	} else {
		var newUser = {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email
		}

		console.log('SUCCESS');
		console.log(newUser);

	}
});

app.listen(3000, function(){
	console.log('Server Started on Port 3000...')
})