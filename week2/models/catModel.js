/* CatModel to handle cat data */
'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

// TODO find single cat from wop_cat table and return it
const getCat = async (catId) => {
  // return cats.find(cat => cat.id == catId);
  try {
    // const [cat] = await promisePool.query(`SELECT * FROM wop_cat where cat_id=${catId}`);
    // use '?' to avoid risk of bad sql injection
    const [cat] = await promisePool.execute(
      'SELECT * FROM wop_cat where cat_id= ?',
      [catId]
    );
    return cat[0];
  } catch (e) {
    console.error('error', e.message);
  }
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

const insertCat = async (cat) => {
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO wop_cat(name, weight, owner, filename, birthdate) VALUES(?, ?, ?, ?, ?)',
      [cat.name, cat.weight, 1, cat.filename || null, cat.birthdate]
    );
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const deleteCat = async (catId) => {
  try {
    const [rows] = await promisePool.execute('DELETE FROM wop_cat WHERE cat_id = ?', [catId]);
    console.log('model delete cat', rows);
  } catch (e) {
    console.log('error', e.message);
  }
}

module.exports = {
  getCat,
  getAllCats,
  insertCat,
  deleteCat,
};
