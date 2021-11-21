/* CatModel to handle cat data */
'use strict';

const { deserializeUser } = require('passport');
const pool = require('../database/db');
const httpError = require('../utils/errors');
const promisePool = pool.promise();

// TODO find single cat from wop_cat table and return it
const getCat = async (catId, next) => {
  // return cats.find(cat => cat.id == catId);
  try {
    // const [cat] = await promisePool.query(`SELECT * FROM wop_cat where cat_id=${catId}`);
    // use '?' to avoid risk of bad sql injection
    const [cat] = await promisePool.execute(
      'SELECT cat_id, wop_cat.name AS name, weight, birthdate, filename, wop_user.name AS ownername FROM wop_cat INNER JOIN wop_user ON wop_user.user_id = wop_cat.owner WHERE cat_id= ?',
      [catId]
    );
    return cat[0];
  } catch (e) {
    console.error('error', e.message);
    const err = httpError('Sql error', 500);
    next(err);
  }
};

// use async await to handle fetching data
const getAllCats = async (next) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner's name as ownername (from wop_user table).
    const [rows] = await promisePool.query(
      'SELECT cat_id, wop_cat.name AS name, weight, birthdate, filename, wop_user.name AS ownername FROM wop_cat INNER JOIN wop_user ON wop_user.user_id = wop_cat.owner'
    );
    return rows;
  } catch (e) {
    console.error('error', e.message);
    const err = httpError('Sql error to get all cats', 500);
    next(err);
  }
};

const insertCat = async (cat) => {
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO wop_cat(name, weight, owner, filename, birthdate) VALUES(?, ?, ?, ?, ?)',
      [cat.name, cat.weight, cat.owner, cat.filename, cat.birthdate]
    );
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const deleteCat = async (catId, user) => {
  console.log(catId, user.user_id);
  try {
    const [rows] = await promisePool.execute(
      'DELETE FROM wop_cat WHERE cat_id = ? and owner = ?',
      [catId, user.user_id]
    );

    console.log('model delete cat', rows);
    return rows.affectedRows === 1;
  } catch (e) {
    console.log('error', e.message);
  }
};

const updateCat = async (id, cat, user) => {
  console.log('run updtaeeeee');
  console.log('check', user.user_id, id);
  let birthdate = cat.birthdate.toString().slice(0,10);
  try {
    console.log('update cat', cat);
    const [rows] = await promisePool.execute(
      'UPDATE wop_cat SET name = ?, weight = ?, owner = ?, birthdate = ? WHERE cat_id = ? and owner = ?',
      [cat.name, cat.weight, cat.owner, birthdate, id, user.user_id]
    );
    return rows.affectedRows === 1;
  } catch (e) {
    console.log('error', e.message);
  }
};

module.exports = {
  getCat,
  getAllCats,
  insertCat,
  deleteCat,
  updateCat,
};
