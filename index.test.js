const request = require('supertest');
const index = require('./index');
const mongoose = require('mongoose');

const app = index.app;

describe('Test wrong login password', () => {
  it('performs wrong pwd login and expects 400', async () => {
    const response = await request(app)
      .post('/user/signin')
      .send({
        email: 'rithvikramasani@gmail.com',
        password: 'wrongpassword'
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid credentials');
  });

  it('returns an error if the user already exists', async () => {
    const response = await request(app)
      .post('/user/signup')
      .send({
        email: 'newuser@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        firstName: 'Jane',
        lastName: 'Doe'
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User already exists');
  });

  it('returns an error if passwords do not match', async () => {
    const response = await request(app)
      .post('/user/signup')
      .send({
        email: 'mismatch@example.com',
        password: 'password123',
        confirmPassword: 'mismatchedpassword',
        firstName: 'Mismatched',
        lastName: 'User'
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Passwords don't match");
  });

  afterAll(async () => {
    // Close the mongoose connection and wait for it to be closed
    mongoose.disconnect();
  });
});
