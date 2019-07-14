const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../data/models/users');


function generateToken(user) {
  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
}

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.getByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ username: user.username, authToken: token });
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
    const token = await generateToken(user);
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
    user = await User.insert(user);
    res.status(201).json({ username: user.username, authToken: token });
  } catch (err) {
    res.status(500).json({ message: 'Database is unavilable' });
  }
});

module.exports = router;
