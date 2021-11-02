'use strict';
/* catController*/

// object detructuring, import only needed functions from catModel
const { getAllCats, getCat } = require('../models/catModel');

const cat_list_get = async (req, res) => {
  const cats = await getAllCats();
  console.log('all cats', cats);
  res.json(cats); //can use: res.send(cats)
};

const cat_get = (req, res) => {
  const cat = getCat(req.params.catId);
  res.json(cat);
};

const cat_post = (req, res) => {
  console.log('add cat data', req.body);
  res.send('From this endpoint you can add cat.');
};

module.exports = {
  cat_list_get,
  cat_get,
  cat_post,
};
