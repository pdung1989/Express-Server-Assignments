'use strict';
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { insertUser } = require('../models/userModel');
const httpError = require('../utils/errors');
const bycrypt = require('bcryptjs');

const login = (req, res, next) => {
  // TODO: add passport authenticate
  passport.authenticate('local', { session: false }, (err, user, info) => {
    console.log('local params', err, user, info);
    if (err || !user) {
      next(httpError('username / password incorrect', 400));
      return;
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        next(httpError('login error', 400));
        return;
      }
      const token = jwt.sign(user, 'ewrweokfwdfvljj'); //this password is the same in pass.js
      return res.json({ user, token });
    });
  })(req, res, next);
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
  //res.send(newUser);
  console.log('add user data', req.body)
  try {
    req.body.passwd = bcrypt.hashSync(req.body.passwd, 12);
    const user = req.body;
    const id = await insertUser(user);
    if (thumb) {
      res.json({ message: `user added with id: ${id}`, user_id: id });
      return;
    }
  } catch (e) {
    console.log('user post error', e.message);
    const err = httpError('Bad request', 400);
    next(err);
    return;
  }
};

module.exports = {
  login,
  user_post
};
