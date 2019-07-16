const request = require('supertest')
const server = require('../api/server')
const db = require('../data/db')
const Users = require('../data/models/users')


describe('User routes', () => {
    afterEach(async () => {
        await db('users').truncate()
    })
    it('should sign up user ', async () => {
        const user = {
            username: 'John',
            password: '123456'
        }
        const res = await request(server).post('/auth/signup').send(user)
        expect(res.status).toBe(201)
        expect(res.type).toBe('application/json')
       
    })
    // it('should log user in ', async () => {
    //     const user = {
    //         username: 'John',
    //         password: '123456'
    //     }
    //     const newUser = await request(server).post('/auth/signup').send(user)
    //     const res = await request(server).post('/auth/login').send({username: newUser.username, password: '123456'})
    //     expect(res.status).toBe(200)
        
    // })
})
