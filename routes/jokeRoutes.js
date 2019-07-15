const express = require('express')
const Jokes = require('../data/models/jokes')
const jwt = require('jsonwebtoken')
const router = express.Router()

// Authorization middleware

function isAuthorized (req, res, next) {
    const token = req.headers.authorization
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if(err) {
                res.status(403).json({message: 'You are not authorized'})
            } else {
                next()
            }
        })
    } else {
        res.status(400).json({message: 'No credentials provided'})
    }
}


// Returns all public jokes
router.get('/', async (req, res) => {
    const jokes = await Jokes.getPublic()
    res.status(200).json(jokes)
})

// TODO: add validation to protect route
router.post('/:id/joke', isAuthorized, (req, res) => {
    res.send('Adds new joke')
})

// TODO: add validation to protect route
router.put('/:id', isAuthorized, (req, res) => {
    res.send('Update jokes')
})

// TODO: add validation to protect route
// Deletes joke
router.delete('/:id', isAuthorized, (req, res) => {
    res.send('Removed Joke')
})


module.exports = router