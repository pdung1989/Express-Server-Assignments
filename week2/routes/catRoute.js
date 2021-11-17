'use strict';
// catRoute
const express = require('express');
const { body } = require('express-validator');

// multer module to handle multipart/form-data because express does not handle it
const multer = require('multer');

//validate file type with fileFilter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes('image')) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// create upload middleware
const upload = multer({ dest: './uploads/', fileFilter });

const {
  cat_list_get,
  cat_get,
  cat_post,
  cat_delete,
  cat_update,
} = require('../controllers/catController');

const router = express.Router(); //use to create routes

router
  .route('/')
  .get(cat_list_get)
  .post(
    upload.single('cat'),
    body('name').notEmpty(),
    body('birthdate').isDate(),
    body('weight').isNumeric(),
    body('owner').isNumeric(),
    cat_post
  ) // add upload middleware
  .put(cat_update);

router.route('/:catId').get(cat_get).delete(cat_delete);

module.exports = router;
