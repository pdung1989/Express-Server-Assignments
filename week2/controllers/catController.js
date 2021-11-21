'use strict';
/* catController */
const { validationResult } = require('express-validator');
// object detructuring, import only needed functions from catModel
const {
  getAllCats,
  getCat,
  insertCat,
  deleteCat,
  updateCat,
} = require('../models/catModel');
const httpError = require('../utils/errors');

const cat_list_get = async (req, res, next) => {
  const cats = await getAllCats(next);
  if (cats.length > 0) {
    res.json(cats);
  } else {
    const err = httpError('Cats not found', 404);
    next(err);
  }
};

const cat_get = async (req, res, next) => {
  const cat = await getCat(req.params.catId, next);
  if (!cat) {
    const err = httpError('Cat not found', 404);
    next(err);
    return;
  }
  res.json(cat);
};

const cat_post = async (req, res, next) => {
  // validate adding cat
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error('cat-post-validation', errors.array());
    const err = httpError('cat data not valid', 400);
    next(err);
    return;
  }

  // validate filename
  console.log('add cat data', req.body, req.user);
  console.log('filename', req.file);
  if (!req.file) {
    const err = httpError('Invalid file', 400);
    next(err);
    return;
  }
  const cat = req.body;
  cat.filename = req.file.filename;
  cat.owner = req.user.user_id;
  const id = await insertCat(cat, next);
  if (cat) {
    res.json({ message: `cat added with id: ${id}`, cat_id: id });
    return;
  }
  const err = httpError('Bad request', 400);
  next(cat);
};

// delete cat
const cat_delete = async (req, res) => {
  const deletedCat = await deleteCat(req.params.catId, req.user);

  res.json({ meassage: 'cat deleted' });
};

// update cat
const cat_update = async (req, res) => {
  console.log('cat_update');
  const updatedCat = await updateCat(req.params.catId, req.body, req.user);

  res.json({ message: `cat updated: ${updatedCat}` });
};

module.exports = {
  cat_list_get,
  cat_get,
  cat_post,
  cat_delete,
  cat_update,
};
