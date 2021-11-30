'use strict';
// catRoute
const express = require('express');
const { body } = require('express-validator');
const {
  user_get,
  user_list_get,
  user_delete,
  user_update,
  checkToken
} = require('../controllers/userController');

const router = express.Router(); //use to create routes

router.get('/', user_list_get);

router.get('/:userId', user_get);

router.delete('/:userId', user_delete);

router.put('/:userId', user_update);

router.get('/token', checkToken);

module.exports = router;
