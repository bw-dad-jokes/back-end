const db = require('../db');

const users = db('users');

function getAll() {
  return users;
}

function getById(id) {
  return users.where({ id }).first();
}

function getByUsername(username) {
  return users.where({ username }).first();
}

async function insert(user) {
  const [id] = await users.insert(user);

  return db('users')
    .where({ id })
    .first();
}

module.exports = {
  getAll,
  getById,
  getByUsername,
  insert
};
