const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
    res.send('Hello from login route')
})

router.get('/signup', (req, res) => {
    res.send('Hello from signup route')
})


module.exports = router