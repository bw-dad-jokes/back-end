const db = require('../db');

const jokes = db('jokes');

// Get all public jokes
async function getPublic() {
  return db('jokes')
    .where({ public: true});
}

// Get all private jokes
async function getPrivate() {
  return db('jokes')
    .where({ private: true });
}

// Add new joke
async function addJoke(joke) {
  const [id] = await db('jokes').insert(joke).returning("id")
  return db('jokes').where({id}).first()
}

// Edit joke
function updateJoke(id, joke) {
  return db('jokes').where('id', Number(id)).update(joke)
}

// Delete joke
function deleteJoke(id) {
  return db('jokes').where('id', Number(id)).del()
}

module.exports = {
  getPublic,
  getPrivate,
  addJoke,
  updateJoke,
  deleteJoke
}