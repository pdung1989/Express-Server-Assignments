/* catController*/
'use strict';
const { validationResult, body } = require('express-validator');

// object detructuring, import only needed functions from userModel
const {
  getAllUsers,
  getUser,
  insertUser,
  deleteUser,
  updateUser,
} = require('../models/userModel');
const httpError = require('../utils/errors');

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

const user_post = async (req, res, next) => {
  const newUser = await insertUser(req.body);
  // form validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('user-post -validation', errors.array());
    const err = httpError('data not valid', 400);
    next(err);
    return;
  }
  res.send(newUser);
};

const user_update = async (req, res) => {
  const updatedUser = await updateUser(req.body);
  res.json({ message: `user updated: ${updatedUser}` });
};

const user_delete = async (req, res) => {
  const deletedUser = await deleteUser(req.params.userId);
  res.send('user deleted');
};

module.exports = {
  user_list_get,
  user_get,
  user_post,
  user_update,
  user_delete,
};
