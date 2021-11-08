'use strict';
// catRoute
const express = require('express');

// multer module to handle multipart/form-data because express does not handle it
const multer = require('multer');
// create upload middleware
const upload = multer({ dest: './uploads/' });

const {
  cat_list_get,
  cat_get,
  cat_post,
  cat_delete,
  cat_update
} = require('../controllers/catController');

const router = express.Router(); //use to create routes

router.route('/')
  .get(cat_list_get)
  .post( upload.single('cat'), cat_post) // add upload middleware
  .put(cat_update);

router.route('/:catId')
  .get(cat_get)
  .delete(cat_delete);

module.exports = router;
