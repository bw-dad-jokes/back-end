const express = require('express')
const server = express()
const userRoutes = require('../routes/userRoutes')

server.use(express.json())

// Routes
server.use('/auth', userRoutes)

server.get('/', (req, res) => {
    res.send('Server is operational')
})

module.exports = server