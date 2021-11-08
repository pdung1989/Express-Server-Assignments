'use strict';
/* catController*/

// object detructuring, import only needed functions from userModel
const { getAllUsers, getUser } = require('../models/userModel');

// middleware function (req, res)
const user_list_get = async (req, res) => {
  const users = await getAllUsers();
  console.log('all users', users);
  res.send(users);
};

const user_get = async (req, res) => {
  const user = await getUser(req.params.userId);
  res.send(user);
};

const user_post = (req, res) => {
  console.log('add user data', req.body);
  res.send('From this endpoint you can add user.');
};

module.exports = {
  user_list_get,
  user_get,
  user_post,
};
