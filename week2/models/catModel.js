'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getCat = async (catId) => {
  // TODO find single cat from wop_cat table and return it
  // return cats.find(cat => cat.id == catId);
  // try {
  //   const [cat] = await promisePool.query('SELECT * FROM wop_cat where cat_id ')
  // }
  // return {}
};

// use async await to handle fetching data
const getAllCats = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.query('SELECT * FROM wop_cat');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

module.exports = {
  getCat,
  getAllCats,
};
