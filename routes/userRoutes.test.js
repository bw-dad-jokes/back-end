const request = require('supertest');
const server = require('../api/server');
const db = require('../data/db');
const Users = require('../data/models/users');

describe('User routes', () => {
  afterEach(async () => {
    await db('users').truncate();
  });
  it('should sign up user ', async () => {
    const user = {
      username: 'John',
      password: '123456'
    };
    const res = await request(server)
      .post('/auth/signup')
      .send(user);
    expect(res.status).toBe(201);
    expect(res.type).toBe('application/json');
  });
  it('should not log user in if there is no account ', async () => {
    const user = {
      username: 'Amy',
      password: '123456'
    };
    const res = await request(server)
      .post('/auth/login')
      .send(user);
    expect(res.status).toBe(500);
  });
  it('should not log user in if username is taken ', async () => {
    const user = {
      username: 'Amy',
      password: '123456'
    }
    const  newUser = await db('users').insert(user)
    const res = await request(server).post('/auth/signup').send({username: newUser.username, password: '123456'})

  
  })
});
