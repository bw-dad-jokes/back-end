const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../data/models/users');

function generateToken(user) {
  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
}

// Checks to see if username is already registered
async function checkUserName(req, res, next) {
  const { username } = req.body;
  const user = await User.getByUsername(username);
  if (user) {
    res.status(400).json({ message: 'Username already taken' });
  } else {
    next();
  }
}

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.getByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ username: user.username, userId: user.id, authToken: token });
    } else {
      res.status(400).json({ message: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Database is unavilable' });
  }
});

router.post('/signup', async (req, res) => {
  try {
    let user = req.body;
    //const hash = bcrypt.hashSync(user.password, 12);
    //user.password = hash;
    const newUser = await User.insert(user)
    console.log(newUser)
    res.status(201).json({ message: `Welcome` });
  } catch ({message}) {
    res.status(500).json({ message });
  }
});

module.exports = router;
