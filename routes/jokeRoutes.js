const express = require('express');
const Jokes = require('../data/models/jokes');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const router = express.Router();

// Authorization middleware

function isAuthorized(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        res.status(403).json({ message: 'You are not authorized' });
      } else {
        req.userId = payload.userId;
        next();
      }
    });
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
}

// Returns all public jokes
router.get('/', async (req, res) => {
  const jokes = await Jokes.getPublic();
  res.status(200).json(jokes);
});

// Add a new joke
router.post(
  '/',
  isAuthorized,
  [
    check('user_id').exists(),
    check('joke_text').exists(),
    check('private').exists(),
    check('public').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
      } else {
        const joke = req.body;
        const newJoke = await Jokes.addJoke(joke);
        res.status(201).json(newJoke);
      }
    } catch (err) {
      res.status(500).json({ message: 'Server is unavailable' });
    }
  }
);

router.put(
  '/:id',
  isAuthorized,
  [
    check('user_id').exists(),
    check('joke_text').exists(),
    check('private').exists(),
    check('public').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json(errors.array());
      } else {
        const id = req.params.id;
        const joke = req.body;
        const updatedJoke = await Jokes.updateJoke(id, joke);
        if (!updatedJoke) {
          return res.status(404).json({ message: 'The joke does not exist' });
        }
        res.status(200).json(updatedJoke);
      }
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  }
);

// Deletes joke
router.delete('/:id', isAuthorized, async (req, res) => {
  try {
    const id = req.params.id;
    const joke = await Jokes.deleteJoke(id);
    if (!joke) {
      return res.status(400).json({ message: 'Joke does not exist' });
    }
    res.status(200).json(joke);
  } catch (err) {
    res.status(500).json({ message: 'Server is unavailable' });
  }
});

module.exports = router;
