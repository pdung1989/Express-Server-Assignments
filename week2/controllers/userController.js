'use strict';
/* catController*/

// object detructuring, import only needed functions from userModel
const { getAllUsers, getUser, insertUser, deleteUser } = require('../models/userModel');

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

const user_post = async (req, res) => {
  const newUser = insertUser(req.body)
  res.send(newUser);
};

const user_delete = async (req, res) => {
  const deletedUser = await deleteUser(req.params.userId);
  res.send('user deleted');
}

module.exports = {
  user_list_get,
  user_get,
  user_post,
  user_delete
};
