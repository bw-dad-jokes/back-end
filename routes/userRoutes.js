const express = require('express')
const router = express.Router()

router.post('/login', (req, res) => {
    res.status(200).json({message: 'Logged in'})
})

router.post('/signup', (req, res) => {
    res.status(201).json({message: 'Account created'})
})


module.exports = router