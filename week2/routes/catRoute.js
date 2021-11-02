'use strict';
// catRoute
const express = require('express');
const { cat_list_get, cat_get, cat_post } = require('../controllers/catController');
const router = express.Router(); //use to create routes

router.get('/', cat_list_get);

router.get('/:catId', cat_get);

router.post('/', cat_post);

router.put('/', (req, res) => {
  res.send('From this endpoint you can update cat.');
});

router.delete('/', (req, res) => {
  res.send('From this endpoint you can delete cats.');
});

module.exports = router;
