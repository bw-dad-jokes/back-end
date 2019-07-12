const db = require('../db');

const jokes = db('jokes');

async function getPublic() {
  const publicJokesAndKeywords = await jokes
    .join('jokes_keywords', 'jokes.id', 'jokes_keywords.joke_id')
    .join('keywords', 'keywords.id', 'jokes_keywords.keyword_id')
    .select('jokes.*', 'keywords.keyword')
    .where({ public: true });
  
  let tempJokeObj = {};
  let currId = publicJokesAndKeywords[0].id;
  let concattedJokes = [];

  function makeNewTempJokeObj(item) {
      tempJokeObj = {
        id: item.id,
        joke_text: item.joke_text,
        public: item.public,
        private: item.private,
        user_id: item.user_id,
        keywords: [item.keyword]
      };
  }

  for (let i = 0; i < publicJokesAndKeywords.length; i++) {
    let currItem = publicJokesAndKeywords[i];
    if (!tempJokeObj.id) {
      makeNewTempJokeObj(currItem);
    } else if (currItem.id === tempJokeObj.id) {
      tempJokeObj.keywords.push(currItem.keyword);
    } else {
      concattedJokes.push(tempJokeObj);
      makeNewTempJokeObj(currItem);
    }
    if (i === publicJokesAndKeywords.length - 1) {
      concattedJokes.push(tempJokeObj);
    }
  }

  return concattedJokes;
}

module.exports = {
  getPublic,
}