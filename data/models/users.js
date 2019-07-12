const db = require('../db');

const users = db('users');

function getAll() {
  return users;
}

function getById(id) {
  return users.where({id});
}

function getByUsername(username) {
  return users.where({username});
}

module.exports = {
  getAll,
  getById,
  getByUsername
}