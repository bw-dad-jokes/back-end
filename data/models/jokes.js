const db = require('../db');

const jokes = db('jokes');

async function getPublic() {
  const publicJokesAndKeywords = await jokes
    .join('jokes_keywords', 'jokes.id', 'jokes_keywords.joke_id')
    .join('keywords', 'keywords.id', 'jokes_keywords.keyword_id')
    .select('jokes.*', 'keywords.keyword')
    .where({ public: true });

  let concattedJokesObj = {};

  for (let i = 0; i < publicJokesAndKeywords.length; i++) {
    let currItem = publicJokesAndKeywords[i];
    let currId = currItem.id;
    if (!concattedJokesObj[currId]) {
      concattedJokesObj[currId] = {
        id: currItem.id,
        joke_text: currItem.joke_text,
        public: currItem.public,
        private: currItem.private,
        user_id: currItem.user_id,
        keywords: [currItem.keyword]
      };
    } else {
      concattedJokesObj[currId].keywords.push(currItem.keyword);
    }
  }

  return Object.keys(concattedJokesObj).map(key => {
    return concattedJokesObj[key];
  });
}

function deleteById(id) {
  return db('users')
    .where({ id })
    .delete();
}

module.exports = {
  getPublic,
  deleteById
}