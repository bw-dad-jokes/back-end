const express = require('express')
const router = express.Router()

// Returns all jokes
router.get('/', (req, res) => {
    res.send('Returns all jokes')
})

// TODO: add validation to protect route
router.post('/:id/joke', (req, res) => {
    res.send('Adds new joke')
})

// TODO: add validation to protect route
router.put('/:id', (req, res) => {
    res.send('Update jokes')
})

// TODO: add validation to protect route
// Deletes joke
router.delete('/:id', (req, res) => {
    res.send('Removed Joke')
})


module.exports = router