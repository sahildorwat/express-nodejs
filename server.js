const fs = require('fs');
const express = require('express');
const hbs = require('hbs');

var app = express();
app.set('view engine', 'hbs');

hbs.registerHelper( 'getCurrentyear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());
hbs.registerPartials(__dirname + '/views/partials')

app.use(express.static(__dirname+'/public'));
app.use((req, res, next) => {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    fs.appendFileSync('server.log', log + '\n');
    next();
});
// app.use((req, res, next) => res.render('maintainance.hbs'));

app.get('/', (req, res) => { res.render('home.hbs', { pageTitle: 'Welcome', 
                                                      message: 'Welcome to express server'}) });
app.get('/about', (req, res) => res.render('about.hbs', { pageTitle: 'about '}));
app.get('/bad', (req, res) => res.send( { errorMessage: 'bad request'}));
app.listen(3000, () => console.log('server is up and running on port 3000'));