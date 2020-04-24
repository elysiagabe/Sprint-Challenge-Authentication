const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');

describe('auth-router', function() {
    describe('Register: POST to /api/auth/reigster', function() {
        beforeEach(async () => {
            await db('users').truncate();
        })

        const newAcct = {
            username: 'test',
            password: 'pass'
        }
        
        it('should return 201 status when successful', function() {
            return request(server)
                .post('/api/auth/register')
                .send(newAcct)
                .then(res => {
                    expect(res.status).toBe(201);
                })
        })

        it('should return object with id, username & password', function() {
            return request(server)
                .post('/api/auth/register')
                .send(newAcct)
                .then(res => {
                    expect(res.body).toHaveProperty('id');
                    expect(res.body).toHaveProperty('username');
                    expect(res.body).toHaveProperty('password');
                })
        })

        it('should add user to the db', async function() {
            const existing = await db('users').where({ username: 'test' })
            expect(existing).toHaveLength(0);

            await request(server)
                .post('/api/auth/register')
                .send(newAcct)
                .then(res => {
                    expect(res.status).toBe(201)
                })
            
            const added = await db('users');
            expect(added).toHaveLength(1);
        })

        it.todo('should return 500 status if request body does not include both username & password')
    })

    describe('Login: POST to /api/auth/login', function() {
        const login = {
            username: 'test',
            password: 'pass'
        }

        it('should return 200 status when login is successful', function() {

            return request(server)
                .post('/api/auth/login')
                .send(login)
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it('should send "Welcome!" message when login is successful', function () {
            return request(server)
                .post('/api/auth/login')
                .send(login)
                .then(res => {
                    expect(res.body.message).toBe('Welcome!')
                })
        })

        it('should generate & return authentication token when login is successful', function() {
            return request(server)
                .post('/api/auth/login')
                .send(login)
                .then(res => {
                    expect(res.body).toHaveProperty('token')
                })
        })
    })
})