'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const catRoute = require('./routes/catRoute');
const userRoute = require('./routes/userRoute');
const httpError = require('./utils/errors');
const passport = require('./utils/pass');
const authRoute = require('./routes/authRoute');
const app = express();
const port = 3000;

app.use(cors());

// for parsing data
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// for authentication
app.use(passport.initialize());

app.use(express.static('uploads'));
//create thumbnails
app.use('/thumbnails', express.static('thumbnails'));


app.use('/auth', authRoute);
app.use('/cat', passport.authenticate('jwt', { session: false }), catRoute);
app.use('/user', passport.authenticate('jwt', { session: false }), userRoute);

//handling error
app.use((req, res, next) => {
  const err = httpError('Not found', 404);
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'internal error' });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
