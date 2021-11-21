'use strict';
// catRoute
const express = require('express');
const { body } = require('express-validator');
const {
  user_get,
  user_list_get,
  user_post,
  user_delete,
  user_update,
} = require('../controllers/userController');

const router = express.Router(); //use to create routes

router.get('/', user_list_get);

router.get('/:userId', user_get);

router.post(
  '/',
  body('name').isLength({ min: 3 }),
  body('email').isEmail(),
  body('passwd').matches('(?=.*[A-Z]).{8,}'),
  user_post
);

router.delete('/:userId', user_delete);

router.put('/:userId', user_update);

module.exports = router;
