'use strict';

// access database
const pool = require('../database/db');
const promisePool = pool.promise();

// get all users
const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM wop_user');
    return rows;
  } catch (error) {
    console.log(error.message);
  }
};

const getUser = async (userId) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM wop_user where user_id = ?',[userId]);
      return rows[0];
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getAllUsers,
  getUser,
};
