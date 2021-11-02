'use strict';
/* catController*/

// object detructuring, import only cats from catModel
const { users, getUser } = require('../models/userModel');

// middleware function (req, res)
const user_list_get = (req, res) => {
  users.map((user) => {
    delete user.password;
  });
  res.json(users);
};

const user_get = (req, res) => {
  const user = getUser(req.params.userId);
  // delete user password
  delete user.password;
  res.json(user);
};

module.exports = {
  user_list_get,
  user_get,
};
