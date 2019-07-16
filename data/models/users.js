const db = require('../db');

const users = db('users');

function getAll() {
  return users;
}

function getById(id) {
  return users.where({ id }).first();
}

function getByUsername(username) {
  //return users.where({ username }).first();
  return db('users').where({username}).first()
}

async function insert(user) {
  const [id] = await db('users').insert(user);

  return db('users')
    .where({ id })
    .first();
}

function deleteById(id) {
  return db('users')
    .where({ id })
    .delete();
}

module.exports = {
  getAll,
  getById,
  getByUsername,
  insert,
  deleteById
};
