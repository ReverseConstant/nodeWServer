const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	let now = new Date().toString();
	var log = (`${now} user logged in ${req.method},  ${req.url} `);
	next();

	fs.appendFile('server.log', log + ' \n ', (err) =>{
		if(err) {
			console.log('problem');
		}
	});
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: "Home Page",
		currentYear: new Date().getFullYear()
	});

});

app.get('/about', (req,res) => {
	res.render('about.hbs', {
		pageTitle: "About Page",
		currentYear: new Date().getFullYear()
	});
});

app.get('/bad', (req,res) => {
	res.send({
		error: "error",
	});
});
app.listen(3001); 