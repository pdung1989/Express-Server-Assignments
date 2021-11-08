'use strict';
// catRoute
const express = require('express');
const {
  user_get,
  user_list_get,
  user_post,
  user_delete,
} = require('../controllers/userController');

const router = express.Router(); //use to create routes

router.get('/', user_list_get);

router.get('/:userId', user_get);

router.post('/', user_post);

router.delete('/:userId', user_delete);

router.put('/', (req, res) => {
  res.send('From this endpoint you can update user.');
});

module.exports = router;
