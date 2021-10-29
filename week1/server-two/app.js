'use strict';

const express = require('express');
const app = express();
const port = 3000;

//use template engine 'pug'
app.set('view engine', 'pug');
//Serve the static content of public folder
app.use(express.static('public'));

// render index.pug
app.get('/', (req, res) => {
  res.render('index', {title: 'Title', pageheading: 'Click on the Cat'})
});

app.get('/page2', (req, res) => {
  res.render('page2', {title: 'Page 2', pageheading: 'This is page 2', 
  page2heading: 'Welcome to page 2'})
})

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.get('/catinfo', (req, res) => {
  const cat = {
    name: 'Kitten',
    birthdate: '2010-12-25',
    weight: 5,
  };
  res.json(cat);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});