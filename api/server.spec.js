const request = require('supertest');
const server = require('./server');
const db = require ('../database/dbConfig');

describe('server', function() {
    describe('GET / endpoint', function() {
        it('should return 200 status', function() {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it('should return {api: "up"} in body of response', function() {
            const expectedBody = { api: 'up' };
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.body).toEqual(expectedBody)
                })
        })
    })
})