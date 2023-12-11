const request = require('supertest');
const index = require('../index');
const mongoose = require('mongoose');

const app = index.app;
const closeServer = index.closeServer;

describe('Check Get Blogs', () => {
    it('performs get blogs and expects 200', async () => {
        const response = await request(app)
        .get('/blogs');
    
        expect(response.status).toBe(200);
    });
});

describe('Check Get Blog', () => {
    it('performs get blog and expects 200', async () => {
        const response = await request(app)
        .get('/blogs/5f9d6c6e1c9d440000d5e0f1');
    
        expect(response.status).toBe(200);
    });
});

afterAll(async () => {
    await closeServer();
});