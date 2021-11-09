'use strict';
/* catController */

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

const cat_post = async (req, res) => {
  const newCat = await insertCat(req.body);
  console.log('add cat data', req.body);

  res.send('CAT ADDED', newCat);
};

// delete cat
const cat_delete = async (req, res) => {
  const deletedCat = await deleteCat(req.params.catId);

  res.send('cat deleted');
};

// update cat
const cat_update = async (req, res) => {
  const updatedCat = await updateCat(req.body);

  res.send(`cat updated: ${updatedCat}`);
};

module.exports = {
  cat_list_get,
  cat_get,
  cat_post,
  cat_delete,
  cat_update,
};
