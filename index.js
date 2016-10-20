import express from 'express';
import exphbs from 'express-handlebars';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Nav from './components/nav';

const app = express();
const port = process.env.PORT || 8000;


//Server static folders
app.use(express.static('public'));

if (process.env.NODE_ENV === 'dev') {
    app.use(express.static('app'));
}


//Routes
app.get('/', function(req, res) {

	let nav = renderToString(<Nav/>);

	res.render('home', {nav});
});


//Template engine
var hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs',
    partialsDir: [
        'views/components/'
    ]
});

app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');


//Start server
app.listen(port, (err) => {
    if (err) { console.log(err) }
    console.log('running server on port ' + port);
});