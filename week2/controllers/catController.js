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

const cat_list_get = async (req, res) => {
  const cats = await getAllCats();
  console.log('all cats', cats);
  res.json(cats); //can use: res.send(cats)
};

const cat_get = async (req, res) => {
  const cat = await getCat(req.params.catId);
  console.log('cat by id', cat);
  res.json(cat);
};

const cat_post = async (req, res) => {
  const newCat = await insertCat(req.body);
  console.log('add cat data', req.body);

  res.send(newCat);
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
}

module.exports = {
  cat_list_get,
  cat_get,
  cat_post,
  cat_delete,
  cat_update,
};
