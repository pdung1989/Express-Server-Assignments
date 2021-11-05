'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const catRoute = require('./routes/catRoute');
const userRoute = require('./routes/userRoute');

const app = express();
const port = 3000;

app.use(cors());

// for parsing data
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/cat', catRoute);
app.use('/user', userRoute);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).send(err.message || 'internal error');
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
