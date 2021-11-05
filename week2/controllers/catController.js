'use strict';
/* catController */

// object detructuring, import only needed functions from catModel
const { getAllCats, getCat, insertCat } = require('../models/catModel');

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
  newCat.filename = req.body.filename;
  console.log('add cat data', req.body);
  console.log('filename', filename);
  
  res.send(newCat);
};

module.exports = {
  cat_list_get,
  cat_get,
  cat_post,
};
