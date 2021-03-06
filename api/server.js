const express = require('express')
const server = express()
const helmet = require('helmet')
const userRoutes = require('../routes/userRoutes')
const jokeRoutes = require('../routes/jokeRoutes')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')
const cors = require('cors')
require('dotenv').config()

server.use(express.json())
server.use(cors())
server.use(helmet())
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Routes
server.use('/auth', userRoutes)
server.use('/api/jokes', jokeRoutes)

server.get('/', (req, res) => {
    res.send('Server is operational')
})

module.exports = server