const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function generateToken(user) {
  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
}

router.post('/login', async (req, res) => {
  res.status(200).json({ message: 'Logged in' });
});

router.post('/signup', async (req, res) => {
  try {
    let user = req.body;
    const token = await generateToken(user);
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
    // ToDo add user to the database
    res
      .status(201)
      .json({ message: `Welcome ${user.username}`, authToken: token });
  } catch (err) {
    req.status(500).json({ message: 'Database is unavilable' });
  }
});

module.exports = router;
