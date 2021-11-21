'use strict';

// access database
const pool = require('../database/db');
const promisePool = pool.promise();

// get all users
const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM wop_user');
    return rows;
  } catch (error) {
    console.log(error.message);
  }
};

// get user by Id
const getUser = async (userId) => {
  try {
    const [rows] = await promisePool.execute(
      'SELECT * FROM wop_user where user_id = ?',
      [userId]
    );
    return rows[0];
  } catch (error) {
    console.log(error.message);
  }
};

const insertUser = async (user) => {
  try {
    const [rows] = await promisePool.execute(
      'INSERT INTO wop_user(name, email, password, role) VALUES(?, ?, ?, ?)',
      [user.name, user.email, user.password, user.role]
    );
    return rows; // or rows.insertId
  } catch (error) {
    console.log(error.message);
  }
};

const deleteUser = async (userId) => {
  try {
    const [rows] = await promisePool.execute(
      'DELETE FROM wop_user WHERE user_id = ?',
      [userId]
    );
    console.log('model delete user', rows);
    return rows.affectedRows === 1;
  } catch (error) {
    console.log(error.message);
  }
};

//update user
const updateUser = async (user) => {
  try {
    const [rows] = await promisePool.execute(
      'UPDATE wop_user SET name = ?, weight = ?, owner = ?, birthdate = ? WHERE user_id = ?',
      [user.name, user.weight, user.owner, user.birthdate, user.id]
    );
    return rows.affectedRows === 1;
  } catch (e) {
    console.error('model update user', e.message);
  }
};


// user log in
const getUserLogin = async (params) => {
  try {
    console.log(params);
    const [rows] = await promisePool.execute(
        'SELECT * FROM wop_user WHERE email = ?;',
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  insertUser,
  deleteUser,
  updateUser,
  getUserLogin,
};
